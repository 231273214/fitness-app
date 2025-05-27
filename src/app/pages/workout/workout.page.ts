import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { TimerComponent } from 'src/app/shared/timer/timer.component';
import { ExercisesService, Exercise } from 'src/app/core/exercises.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerComponent
  ]
})
export class WorkoutPage {
  timerDuration: number = 60;
  startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  currentExercises: any[] = [];
  availableExercises: Exercise[] = [];

  constructor(
    private alertController: AlertController,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit() {
    this.availableExercises = this.exercisesService.getAll();
  }

  onTimerFinished() {
    alert('¡Tiempo finalizado!');
  }

  async addExercise() {
    const alert = await this.alertController.create({
      header: 'Seleccionar ejercicio',
      inputs: this.availableExercises.map((exercise) => ({
        name: 'exercise',
        type: 'radio',
        label: exercise.name,
        value: exercise.id
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (selectedId) => {
            const exercise = this.exercisesService.getById(selectedId);
            if (exercise) {
              this.currentExercises.push({
                id: exercise.id,
                name: exercise.name,
                sets: [
                  { weight: null, reps: null }
                ]
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  addSet(exerciseIndex: number) {
    this.currentExercises[exerciseIndex].sets.push({ weight: null, reps: null });
  }

  finishWorkout() {
    console.log('Workout terminado:', this.currentExercises);
  }

  cancelWorkout() {
    this.currentExercises = [];
  }
}
