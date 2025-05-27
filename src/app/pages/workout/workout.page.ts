import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TimerComponent } from 'src/app/shared/timer/timer.component';
import { ExercisesService, Exercise } from 'src/app/core/exercises.service';

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
  startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  workoutName: string = 'Entrenamiento Personalizado';
  currentExercises: any[] = [];
  availableExercises: Exercise[] = [];

  constructor(
    private alertController: AlertController,
    private exercisesService: ExercisesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.availableExercises = this.exercisesService.getAll();
  }

  goToHome() {
    this.router.navigate(['/home']); // Ajusta la ruta según tu configuración
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
                  {
                    weight: null,
                    reps: null,
                    completed: false,
                    restTimer: null
                  }
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
    this.currentExercises[exerciseIndex].sets.push({
      weight: null,
      reps: null,
      completed: false,
      restTimer: null
    });
  }

  toggleSetCompletion(exIndex: number, setIndex: number) {
    const set = this.currentExercises[exIndex].sets[setIndex];
    set.completed = !set.completed;

    if (set.completed) {
      set.restTimer = 180; // 3 minutos
    } else {
      set.restTimer = null;
    }
  }

  deleteSet(exerciseIndex: number, setIndex: number) {
    // Verificar si es la última serie y mostrar confirmación
    if (this.currentExercises[exerciseIndex].sets.length === 1) {
      this.presentDeleteLastSetAlert(exerciseIndex);
    } else {
      this.currentExercises[exerciseIndex].sets.splice(setIndex, 1);
    }
  }

  async presentDeleteLastSetAlert(exerciseIndex: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres borrar la última serie? Esto eliminará el ejercicio completo.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          handler: () => {
            this.currentExercises.splice(exerciseIndex, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  finishWorkout() {
    console.log('Workout terminado:', this.currentExercises);
  }

  cancelWorkout() {
    this.currentExercises = [];
  }
}