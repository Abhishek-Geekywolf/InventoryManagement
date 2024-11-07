import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernavComponent } from './customernav.component';

describe('CustomernavComponent', () => {
  let component: CustomernavComponent;
  let fixture: ComponentFixture<CustomernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomernavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
