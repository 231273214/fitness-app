import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonListHeader, 
  IonButtons,
  IonButton
} from '@ionic/angular/standalone';
import { ExercisesService } from '../../core/exercises.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exercise-library',
  templateUrl: './exercise-library.page.html',
  styleUrls: ['./exercise-library.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    CommonModule, 
    FormsModule,
    RouterModule,
    IonButtons,
    IonButton
  ]
})
export class ExerciseLibraryPage implements OnInit {
  groupedExercises: {letter: string, exercises: any[]}[] = [];

  constructor(private exercisesService: ExercisesService, private router: Router) { }

  ngOnInit() {
    this.groupedExercises = this.exercisesService.getExercisesGroupedByLetter();
  }
  goToHome() {
    this.router.navigate(['/home']); // Ajusta la ruta según tu configuración
  }
}