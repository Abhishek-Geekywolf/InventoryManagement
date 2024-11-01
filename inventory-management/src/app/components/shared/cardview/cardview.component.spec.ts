import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardviewComponent } from './cardview.component';

describe('CardviewComponent', () => {
  let component: CardviewComponent;
  let fixture: ComponentFixture<CardviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
