import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseListComponent } from './cheese-list.component';

describe('CheeseListComponent', () => {
  let component: CheeseListComponent;
  let fixture: ComponentFixture<CheeseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheeseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
