import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsetsListComponent } from './optionsets-list.component';

describe('OptionsetsListComponent', () => {
  let component: OptionsetsListComponent;
  let fixture: ComponentFixture<OptionsetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
