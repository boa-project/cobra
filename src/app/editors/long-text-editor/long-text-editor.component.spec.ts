import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextEditorComponent } from './long-text-editor.component';

describe('LongTextEditorComponent', () => {
  let component: LongTextEditorComponent;
  let fixture: ComponentFixture<LongTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
