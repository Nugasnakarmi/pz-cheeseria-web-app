import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseShopComponent } from './cheese-shop.component';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

describe('CheeseShopComponent', () => {
  let component: CheeseShopComponent;
  let fixture: ComponentFixture<CheeseShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseShopComponent],
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

    fixture = TestBed.createComponent(CheeseShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(CheeseShopComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('PZ Cheeseria');
  });
});
