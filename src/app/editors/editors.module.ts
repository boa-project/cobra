import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { TranslateModule } from '@ngx-translate/core';

import { EditorSelectorDirective } from './editor-selector/editor-selector.directive';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { BaseEditorComponent } from './base-editor/base-editor.component';
import { LongTextEditorComponent } from './long-text-editor/long-text-editor.component';
import { OptionSetEditorComponent } from './option-set-editor/option-set-editor.component';
import { DateEditorComponent } from './date-editor/date-editor.component';
import { VCardEditorComponent } from './vcard-editor/vcard-editor.component';
import { DurationEditorComponent } from './duration-editor/duration-editor.component';
import { KeywordsEditorComponent } from './keywords-editor/keywords-editor.component';

import { OptionSetsService } from './providers/option-sets.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule,
    TranslateModule.forChild()
  ],
  declarations: [
    EditorSelectorDirective,
    BaseEditorComponent,
    TextEditorComponent,
    LongTextEditorComponent,
    OptionSetEditorComponent,
    DateEditorComponent,
    VCardEditorComponent,
    DurationEditorComponent,
    KeywordsEditorComponent
  ],
  entryComponents: [TextEditorComponent, LongTextEditorComponent, OptionSetEditorComponent, DateEditorComponent, VCardEditorComponent, DurationEditorComponent, KeywordsEditorComponent ],
  exports: [ EditorSelectorDirective, BaseEditorComponent, TextEditorComponent, LongTextEditorComponent, OptionSetEditorComponent, DateEditorComponent, VCardEditorComponent, DurationEditorComponent, KeywordsEditorComponent ],
  providers: [ OptionSetsService ]
})
export class EditorsModule { }
