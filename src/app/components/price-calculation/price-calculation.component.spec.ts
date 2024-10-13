import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCalculationComponent } from './price-calculation.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

import { CheeseService } from '../../services/cheese.service';

describe('PriceCalculationComponent', () => {
  let component: PriceCalculationComponent;
  let fixture: ComponentFixture<PriceCalculationComponent>;
  let cheeseService: Partial<CheeseService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCalculationComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideToastr({
          positionClass: 'toast-top-right',
          closeButton: true,
          enableHtml: true,
          tapToDismiss: true,
          preventDuplicates: true,
        }),
        provideRouter(routes),
        { provide: CheeseService, useValue: cheeseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price be 50 when price per kilo is 25 and weight is 2kg', () => {
    {
      component.cheese.pricePerKilo = 25;
      component.priceForm.controls['weight'].setValue(2);
      component.calculatePrice();
      expect(component.totalPrice).toBe(50);
    }
  });

  it('should calculate total price to be 81.25  when price per kilo is 32.5 and weight is 2.5kg', () => {
    {
      component.cheese.pricePerKilo = 32.5;
      component.priceForm.controls['weight'].setValue(2.5);
      component.calculatePrice();
      expect(component.totalPrice).toBe(81.25);
    }
  });

  it('should calculate total price to be 0  when price per kilo is 32.5 and weight is 0kg', () => {
    {
      component.cheese.pricePerKilo = 32.5;
      component.priceForm.controls['weight'].setValue(0);
      component.calculatePrice();
      expect(component.totalPrice).toBe(0);
    }
  });
});
