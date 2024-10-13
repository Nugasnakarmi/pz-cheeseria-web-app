import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseListComponent } from './cheese-list.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

describe('CheeseListComponent', () => {
  let component: CheeseListComponent;
  let fixture: ComponentFixture<CheeseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseListComponent],
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

    fixture = TestBed.createComponent(CheeseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
