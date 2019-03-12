import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderPage } from './make-order.page';

describe('MakeOrderPage', () => {
  let component: MakeOrderPage;
  let fixture: ComponentFixture<MakeOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MakeOrderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
