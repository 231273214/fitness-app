// exercise-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent {
  @Input() exercise: any; 
}