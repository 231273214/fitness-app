import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description?: string;
  videoUrl?: string;
  equipment?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private exercisesCollection = collection(this.firestore, 'exercises');

  constructor(private firestore: Firestore) {}

  getAll(): Observable<Exercise[]> {
    return collectionData(this.exercisesCollection) as Observable<Exercise[]>;
  }

  // Si prefieres mantener datos estáticos (opcional)
  private staticExercises: Exercise[] = [
    { id: 1, name: 'Lat Pulldown (Cable)', muscleGroup: 'Back', equipment: 'Cable Machine', difficulty: 'Beginner' },
    { id: 2, name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
    // ...otros ejercicios
  ];

  getStaticAll(): Exercise[] {
    return [...this.staticExercises];
  }

  getStaticById(id: number): Exercise | undefined {
    return this.staticExercises.find(ex => ex.id === id);
  }
}