import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSetEditorComponent } from './option-set-editor.component';

describe('OptionSetEditorComponent', () => {
  let component: OptionSetEditorComponent;
  let fixture: ComponentFixture<OptionSetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionSetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
