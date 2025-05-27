import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonListHeader 
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
    RouterModule
  ]
})
export class ExerciseLibraryPage implements OnInit {
  groupedExercises: {letter: string, exercises: any[]}[] = [];

  constructor(private exercisesService: ExercisesService) { }

  ngOnInit() {
    this.groupedExercises = this.exercisesService.getExercisesGroupedByLetter();
  }
}