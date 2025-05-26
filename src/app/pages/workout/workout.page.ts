import { WorkoutService } from '../../core/workout.service';

export class WorkoutPage {
  exercises = [
    { name: 'Press banca', sets: 3, reps: 10, weight: 50 }
  ];

  constructor(private workoutService: WorkoutService) {}

  async saveWorkout() {
    const success = await this.workoutService.saveWorkout({
      exercises: this.exercises
    });
    
    if (success) {
      alert('¡Entrenamiento guardado!');
    } else {
      alert('Error al guardar');
    }
  }
}