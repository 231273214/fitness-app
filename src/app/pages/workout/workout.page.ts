import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { TimerComponent } from 'src/app/shared/timer/timer.component';
import { ExercisesService, Exercise } from 'src/app/core/exercises.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class WorkoutPage implements OnInit {
  timerDuration: number = 60;
  startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  currentExercises: any[] = [];
  availableExercises: Exercise[] = [];

  constructor(
    private alertController: AlertController,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit() {
    this.exercisesService.getAll().subscribe(exercises => {
      this.availableExercises = exercises;
    });
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
            this.exercisesService.getById(selectedId).subscribe(exercise => {
              if (exercise) {
                this.currentExercises.push({
                  id: exercise.id,
                  name: exercise.name,
                  sets: [
                    { weight: null, reps: null }
                  ]
                });
              }
            });
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