import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import * as xml2js from 'xml2js';
//import { of } from 'rxjs/observable/of';

import { AppConfigService } from './app-config.service';
import { SpecMode } from './app-config.model';

declare var ActiveXObject: (type: any) => void;

export function xmlDoc(xmlString){
	if ('DOMParser' in window && window['DOMParser'])
	{
    var parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
	}
	else if ('ActiveXObject' in window && window['ActiveXObject']) // Internet Explorer
	{
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(xmlString);
    return xmlDoc;
	}
}

@Injectable({
  providedIn: 'root'
})
export class SpecsService {
	xml2jsParser:any;
  xml2jsBuilder:any;

  constructor(private http: HttpClient) {
  	this.xml2jsParser = new xml2js.Parser({
  		explicitArray: false,
  		explicitRoot: false,
  		charkey: '_help',
      attrValueProcessors: [xml2js.processors.parseBooleans] //xml2js.processors.parseNumbers, 
  	});
    this.xml2jsBuilder = new xml2js.Builder({
      cdata: true,
      rootName: 'spec'
    });
  }

  getMetadata(){
  	return AppConfigService.metadata;
  }


  getSpecs():Observable<any> {
  	const settings = AppConfigService.settings;
  	return from(new Promise((resolve, reject) => {
	  	if (settings.getSpecList.mode == SpecMode.SCRIPT){
	  		try {
	  			const callback = (list) => { 
	  				resolve(list); 
	  			};
		  		eval(settings.getSpecList.value);
	  		}
	  		catch(err) {
	  			reject({ code: 'FAILED_TO_EVAL_GET_SPECS_LIST_SCRIPT', error: err });
	  		}
	  	}
	  	else if(settings.getSpecList.mode == SpecMode.URL) {
	  		let source = this.http.get<Array<any>>(settings.getSpecList.value);
	  		source.subscribe((result) => {
	  			resolve(result);
	  		}, () => {}, () => {
	  			reject({ code: 'FAILED_TO_RETRIEVE_SPECS_LIST', error: 'FAILED_TO_RETRIEVE_SPECS_LIST' });
	  		});
	  	}
	  	else {
	  		reject({ code: 'METHOD_NOT_IMPLEMENTED', error: 'METHOD_NOT_IMPLEMENTED' });
	  	}
  	}));
  }
  
  getSpecById(id):Observable<any> {
  	const settings = AppConfigService.settings;
  	return from(new Promise((resolve, reject) => {
	  	if (settings.getSpec.mode == SpecMode.SCRIPT){
	  		try {
	  			const spec_id = id;
	  			const callback = (specXml) => { 
	  				this.parseXml2Js(specXml, resolve); 
	  			};
		  		eval(settings.getSpec.value);
	  		}
	  		catch(err) {
	  			reject({ code: 'FAILED_TO_EVAL_GET_SPEC_SCRIPT', error: err });
	  		}
	  	}
	  	else if(settings.getSpec.mode == SpecMode.URL) {
	  		let source = this.http.get(settings.getSpec.value.replace('{{ID}}', id), { responseType: 'text' });
	  		source.subscribe((result) => {
	  			this.parseXml2Js(result, resolve);
	  		}, () => {}, () => {
	  			reject({ code: 'FAILED_TO_RETRIEVE_SPEC', error: 'FAILED_TO_RETRIEVE_SPEC' });
	  		});
	  	}
	  	else {
	  		reject({ code: 'METHOD_NOT_IMPLEMENTED', error: 'METHOD_NOT_IMPLEMENTED' });
	  	}
  	}));
  }

  saveSpec(specJs):Observable<void>{
    const settings = AppConfigService.settings;
    let xml = this.xml2jsBuilder.buildObject(specJs);
    return from(new Promise((resolve, reject) => {
      if (settings.saveSpec.mode == SpecMode.SCRIPT){
        try {
          const callback = (output) => { 
            resolve();
          };
          eval(settings.saveSpec.value);
        }
        catch(err) {
          reject({ code: 'FAILED_TO_EVAL_SAVE_SPEC_SCRIPT', error: err });
        }
      }
      else if (settings.saveSpec.mode == SpecMode.URL){
        console.log(xml);
        resolve();
      }
      else {
        reject();
      }
    }));
  }

  private parseXml2Js(xml, resolve){
  	let js = this.xml2jsParser.parseString(xml, (err, result) => {
  		console.log(err);
		resolve({xml: xmlDoc(xml), js: result});
  	});
  }
}
