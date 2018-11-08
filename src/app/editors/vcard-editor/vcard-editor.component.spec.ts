import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCardEditorComponent } from './vcard-editor.component';

describe('VcardEditorComponent', () => {
  let component: VCardEditorComponent;
  let fixture: ComponentFixture<VCardEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCardEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
