import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, time } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel, RouterLink 
  ]
})
export class HomePage {
  constructor(private router: Router) {
    addIcons({ barbell, time });
  }

  goToWorkout() {
    this.router.navigate(['/workout'], {
      state: { isNewWorkout: true } // Opcional: enviar datos
    });
  }
}