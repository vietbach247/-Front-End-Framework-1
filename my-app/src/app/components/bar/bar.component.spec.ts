import { ComponentFixture, TestBed } from '@angular/core/testing';

import { barComponent } from './bar.component';

describe('barComponent', () => {
  let component: barComponent;
  let fixture: ComponentFixture<barComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [barComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(barComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
