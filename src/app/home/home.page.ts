import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonItem, IonLabel, IonTabs,
  IonTabBar, IonTabButton, IonIcon, IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, time } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonItem, IonLabel, IonTabs,
    IonTabBar, IonTabButton, IonIcon, IonRouterLink
  ]
})
export class HomePage {
  constructor(private router: Router) {
    addIcons({ barbell, time });
  }

  // Método para navegar a workout
  goToWorkout() {
    this.router.navigate(['/workout']);
  }
}