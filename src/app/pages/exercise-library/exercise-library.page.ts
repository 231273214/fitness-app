import { Component, OnInit } from '@angular/core';
import { ExercisesService, Exercise } from '../../core/exercises.service';
import { WorkoutService, ExerciseInWorkout } from '../../core/workout.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonSegment, 
  IonSegmentButton, 
  IonList, 
  IonItemSliding, 
  IonItem, 
  IonLabel, 
  IonBadge, 
  IonFab, 
  IonFabButton, 
  IonIcon,
  IonButtons,
  IonButton,
  IonLoading
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-library',
  templateUrl: './exercise-library.page.html',
  styleUrls: ['./exercise-library.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonBadge,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButtons,
    IonButton,
    IonLoading
  ]
})

export class ExerciseLibraryPage implements OnInit {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];
  searchTerm = '';
  muscleGroups: string[] = [];
  selectedMuscleGroup = 'all';
  isLoading = false;

  constructor(
    private exercisesService: ExercisesService,
    private workoutService: WorkoutService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.loadExercises();
  }

  async loadExercises() {
    this.isLoading = true;
    try {
      // Si usas Firestore:
      // this.exercisesService.getAll().subscribe(exercises => {
      //   this.exercises = exercises;
      //   this.filterExercises();
      //   this.extractMuscleGroups();
      // });

      // Versión con datos estáticos:
      this.exercises = this.exercisesService.getStaticAll();
      this.filterExercises();
      this.extractMuscleGroups();
    } catch (error) {
      console.error('Error loading exercises:', error);
      this.showAlert('Error', 'No se pudieron cargar los ejercicios');
    } finally {
      this.isLoading = false;
    }
  }

  extractMuscleGroups() {
    const groups = new Set(this.exercises.map(ex => ex.muscleGroup));
    this.muscleGroups = ['all', ...Array.from(groups)];
  }

  filterExercises() {
    this.filteredExercises = this.exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGroup = this.selectedMuscleGroup === 'all' || 
                          exercise.muscleGroup === this.selectedMuscleGroup;
      return matchesSearch && matchesGroup;
    });
  }

  toggleExerciseSelection(exercise: Exercise) {
    const index = this.selectedExercises.findIndex(ex => ex.id === exercise.id);
    if (index > -1) {
      this.selectedExercises.splice(index, 1);
    } else {
      this.selectedExercises.push(exercise);
    }
  }

  isSelected(exercise: Exercise): boolean {
    return this.selectedExercises.some(ex => ex.id === exercise.id);
  }

  async createWorkout() {
    if (this.selectedExercises.length === 0) {
      this.showAlert('Error', 'Selecciona al menos un ejercicio');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creando entrenamiento...'
    });
    await loading.present();

    try {
      const workoutExercises: ExerciseInWorkout[] = this.selectedExercises.map(ex => ({
        exerciseId: ex.id,
        sets: 3, 
        reps: 10,
        weight: undefined 
  }));
      const success = await this.workoutService.saveWorkout({
        exercises: workoutExercises
      });

      if (success) {
        this.showAlert('Éxito', 'Entrenamiento creado correctamente');
        this.selectedExercises = [];
      }
    } catch (error) {
      console.error('Error creating workout:', error);
      this.showAlert('Error', 'No se pudo crear el entrenamiento');
    } finally {
      await loading.dismiss();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
  }
}