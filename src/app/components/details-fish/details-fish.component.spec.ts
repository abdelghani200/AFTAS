import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFishComponent } from './details-fish.component';

describe('DetailsFishComponent', () => {
  let component: DetailsFishComponent;
  let fixture: ComponentFixture<DetailsFishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFishComponent]
    });
    fixture = TestBed.createComponent(DetailsFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
