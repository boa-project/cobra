import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsCategoriesComponent } from './fields-categories.component';

describe('FieldsCategoriesComponent', () => {
  let component: FieldsCategoriesComponent;
  let fixture: ComponentFixture<FieldsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
