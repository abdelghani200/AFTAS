import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPodiumComponent } from './details-podium.component';

describe('DetailsPodiumComponent', () => {
  let component: DetailsPodiumComponent;
  let fixture: ComponentFixture<DetailsPodiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPodiumComponent]
    });
    fixture = TestBed.createComponent(DetailsPodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
