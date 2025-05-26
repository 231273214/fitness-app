import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonContent, IonButton]
})
export class HomePage {
  constructor(private router: Router) {}

  goToWorkout() {
    this.router.navigate(['/workout']);
  }
}