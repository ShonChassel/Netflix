import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieIndexComponent } from './movie-index.component';

describe('MovieIndexComponent', () => {
  let component: MovieIndexComponent;
  let fixture: ComponentFixture<MovieIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
