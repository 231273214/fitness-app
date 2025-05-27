import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  
  // Datos estáticos (corregido el nombre para mantener consistencia)
  private staticExercises: Exercise[] = [
    { id: 1, name: 'Lat Pulldown (Cable)', muscleGroup: 'Back', equipment: 'Cable Machine', difficulty: 'Beginner' },
    { id: 2, name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
    // ...otros ejercicios
  ];

  constructor(private firestore: Firestore) {}

  // Obtener todos los ejercicios desde Firestore
  getAll(): Observable<Exercise[]> {
    return collectionData(this.exercisesCollection, { idField: 'id' }) as Observable<Exercise[]>;
  }

  // Obtener un ejercicio por ID desde Firestore
  getById(id: string): Observable<Exercise | undefined> {
    const exerciseDoc = doc(this.firestore, `exercises/${id}`);
    return docData(exerciseDoc, { idField: 'id' }) as Observable<Exercise>;
  }

  // Métodos estáticos (opcional)
  getStaticAll(): Exercise[] {
    return [...this.staticExercises];
  }

  // Corregido el typo de staticExercises (antes estaba staticExercises)
  getStaticById(id: number): Exercise | undefined {
    return this.staticExercises.find(ex => ex.id === id);
  }
}