import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseLibraryPage } from './exercise-library.page';

describe('ExerciseLibraryPage', () => {
  let component: ExerciseLibraryPage;
  let fixture: ComponentFixture<ExerciseLibraryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
