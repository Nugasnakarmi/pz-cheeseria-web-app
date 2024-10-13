import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseFormComponent } from './cheese-form.component';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CheeseFormComponent', () => {
  let component: CheeseFormComponent;
  let fixture: ComponentFixture<CheeseFormComponent>;
  let debugElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseFormComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideToastr({
          positionClass: 'toast-top-right',
          closeButton: true,
          enableHtml: true,
          tapToDismiss: true,
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheeseFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form element', () => {
    const formElement = debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();
  });
});
