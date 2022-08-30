/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationPresenterComponent } from './recommendation-presenter.component';

describe('RecommendationPresenterComponent', () => {
  let component: RecommendationPresenterComponent;
  let fixture: ComponentFixture<RecommendationPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationPresenterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
