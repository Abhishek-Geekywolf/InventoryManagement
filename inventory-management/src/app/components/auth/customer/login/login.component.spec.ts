import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: CLoginComponent;
  let fixture: ComponentFixture<CLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
