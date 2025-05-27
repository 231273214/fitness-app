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
  IonListHeader,
  IonBackButton,
  IonButtons, 
  IonImg,
  IonNote
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../core/exercises.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
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
    IonBackButton,
    IonButtons,
    IonImg,
    IonNote,
    CommonModule, 
    FormsModule
  ]
})
export class ExerciseDetailPage implements OnInit {
  exercise: any;

  constructor(
    private route: ActivatedRoute,
    private exercisesService: ExercisesService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.exercise = this.exercisesService.getById(id);
    }
  }
}