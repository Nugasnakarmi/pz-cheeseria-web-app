import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CheeseService } from './cheese.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';

describe('CheeseService', () => {
  let service: CheeseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
    service = TestBed.inject(CheeseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TO DO: Add more test for service methods
});
