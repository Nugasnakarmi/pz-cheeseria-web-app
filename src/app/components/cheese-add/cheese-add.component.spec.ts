import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseAddComponent } from './cheese-add.component';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Cheese } from '../../interfaces/cheese.interface';
import { of } from 'rxjs';
import { CheeseService } from '../../services/cheese.service';

describe('CheeseAddComponent', () => {
  let component: CheeseAddComponent;
  let fixture: ComponentFixture<CheeseAddComponent>;
  let routerMock: any;
  let cheeseServiceMock: any;
  beforeEach(async () => {
    cheeseServiceMock = {
      addCheese$: jasmine.createSpy('addCheese$').and.returnValue(of({})),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CheeseAddComponent],
      providers: [
        { provide: CheeseService, useValue: cheeseServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheeseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCheese$ on cheeseService when onCheeseAdded is called', () => {
    const cheese = { name: 'Brie' } as Cheese;
    component.onCheeseAdded(cheese);
    expect(cheeseServiceMock.addCheese$).toHaveBeenCalledWith(cheese);
  });
});
