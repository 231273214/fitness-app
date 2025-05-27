import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface Workout {
  id?: string; 
  date: Date;
  exercises: ExerciseInWorkout[];
  userId: string;
  notes?: string;
}

export interface ExerciseInWorkout {
  exerciseId: number;
  sets: number;
  reps: number;
  weight?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  async saveWorkout(workoutData: Omit<Workout, 'id' | 'userId' | 'date'>): Promise<boolean> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) {
      console.error('No user logged in');
      return false;
    }

    const workout: Workout = {
      ...workoutData,
      date: new Date(),
      userId
    };

    try {
      const workoutsRef = collection(this.firestore, 'workouts');
      await addDoc(workoutsRef, workout);
      return true;
    } catch (error) {
      console.error('Error saving workout:', error);
      throw error; 
    }
  }

  getUserWorkouts(): Observable<Workout[]> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const workoutsRef = collection(this.firestore, 'workouts');
    const q = query(workoutsRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Workout[]>;
  }
}