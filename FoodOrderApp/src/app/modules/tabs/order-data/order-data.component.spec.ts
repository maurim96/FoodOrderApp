import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDataPage } from './order-data.page';

describe('OrderDataPage', () => {
  let component: OrderDataPage;
  let fixture: ComponentFixture<OrderDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
