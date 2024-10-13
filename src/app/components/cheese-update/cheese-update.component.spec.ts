import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseUpdateComponent } from './cheese-update.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('CheeseUpdateComponent', () => {
  let component: CheeseUpdateComponent;
  let fixture: ComponentFixture<CheeseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseUpdateComponent],
      providers: [
        provideRouter(routes),
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

    fixture = TestBed.createComponent(CheeseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
