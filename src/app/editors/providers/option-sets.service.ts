import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionSetsService {

  optionsets: Array<any>;

  optionsetscache: any;

  constructor(private translate: TranslateService) {
    this.optionsetscache = {};
  }

  public initialize(optionsets:Array<any>) {
    this.optionsetscache = {};
    this.optionsets = optionsets;
  }

  public get(name:string):Observable<Array<any>> {

    if (name in this.optionsetscache) {
      return of(this.optionsetscache[name]);
    }

    let sets = this.optionsets.filter((set) => { return set.$.name == name });

    if (!sets.length) {
      this.optionsetscache[name] = [];
      return of(this.optionsetscache[name]);
    }

    let choices = [];
    const textprefix = 'optionset.'+name+'.';

    for(let group of sets[0].$.values.split('||')){
      if (/::/.test(group)) {
        let parts = group.split('::');
        choices.push({ value: parts[0], text: textprefix+parts[0], group: true });
        group = parts[1];
      }

      for(let entry of group.split('|')){
        choices.push({ value: entry, text: textprefix+entry });
      }
    };

    this.translate.get(choices.map(ch => ch.text)).subscribe((translations) => {
      //console.log(translations);
      choices.forEach((ch) => {
        ch.text = translations[ch.text] || ch.text;
      })
    });

    this.optionsetscache[name] = choices;
    return of(choices);
  }
}
