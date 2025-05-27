import { Injectable } from '@angular/core';

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description?: string;
  videoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private exercises: Exercise[] = [
    { id: 1, name: 'Lat Pulldown (Cable)', muscleGroup: 'Back' },
    { id: 2, name: 'Bench Press', muscleGroup: 'Chest' },
    { id: 3, name: 'Squat', muscleGroup: 'Legs' },
    { id: 4, name: 'Biceps Curl', muscleGroup: 'Arms' },
    { id: 5, name: 'Triceps Extension', muscleGroup: 'Arms' },
  ];

  constructor() {}

  getAll(): Exercise[] {
    return [...this.exercises];
  }

  getById(id: number): Exercise | undefined {
    return this.exercises.find(ex => ex.id === id);
  }
}
