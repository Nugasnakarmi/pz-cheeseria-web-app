import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseAddComponent } from './cheese-add.component';

describe('CheeseAddComponent', () => {
  let component: CheeseAddComponent;
  let fixture: ComponentFixture<CheeseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheeseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
