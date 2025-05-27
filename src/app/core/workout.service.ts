import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(
    private firestore: Firestore,
    private auth: Auth // Inyecta Auth para obtener el userId
  ) {}

  async saveWorkout(workoutData: { exercises: any[] }) {
    const workout = {
      date: new Date(),
      exercises: workoutData.exercises,
      userId: this.auth.currentUser?.uid // Asocia el entrenamiento al usuario
    };

    try {
      const workoutsRef = collection(this.firestore, 'workouts');
      await addDoc(workoutsRef, workout);
      return true; // Éxito
    } catch (error) {
      console.error('Error guardando entrenamiento:', error);
      return false; // Fallo
    }
  }
}