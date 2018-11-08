import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EditorsModule } from './editors/editors.module';
import { AppConfigService } from './providers/app-config.service';

import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';
import { OptionsetsListComponent } from './optionsets-list/optionsets-list.component';
import { FieldsCategoriesComponent } from './fields-categories/fields-categories.component';
import { SingleFieldComponent } from './single-field/single-field.component';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TypesListComponent,
    OptionsetsListComponent,
    FieldsCategoriesComponent,
    SingleFieldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditorsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SuiModule
  ],
  providers: [
   	{ provide: APP_INITIALIZER,
     	useFactory: initializeApp,
     	deps: [AppConfigService],
     	multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
