import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSelectionPage } from './menu-selection.page';

describe('MenuSelectionPage', () => {
  let component: MenuSelectionPage;
  let fixture: ComponentFixture<MenuSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
