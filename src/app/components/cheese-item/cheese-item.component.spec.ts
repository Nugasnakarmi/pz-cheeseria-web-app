import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseItemComponent } from './cheese-item.component';

describe('CheeseItemComponent', () => {
  let component: CheeseItemComponent;
  let fixture: ComponentFixture<CheeseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheeseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheeseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
