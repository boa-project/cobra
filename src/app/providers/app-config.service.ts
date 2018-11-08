import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from './app-config.model';

import { forkJoin } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static settings: IAppConfig;
  static metadata: any;

  xml2jsParser: any;

  constructor(private http: HttpClient) {
    this.xml2jsParser = new xml2js.Parser({
      explicitArray: false,
      explicitRoot: false,
      charkey: '_help'
    });
  }

  load() {
    const envname = environment.production ? "prod" : "dev";
      const jsonFile = `./assets/config/${envname}.json`;
      const metaFile = `./assets/config/metadata.xml`;
      return new Promise<void>((resolve, reject) => {
        let config = this.http.get<IAppConfig>(jsonFile);
        let meta = this.http.get(metaFile, { responseType: 'text' });
        forkJoin([config, meta]).toPromise().then(result => {
          AppConfigService.settings = result[0];
          this.parseXml2Js(result[1]);
          resolve();
        }).catch((response: any) => {
           reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        });
      });
  }

  private parseXml2Js(xml){
    let js = this.xml2jsParser.parseString(xml, (err, result) => {
      console.log(err);
      AppConfigService.metadata = result;
    });
  }
}