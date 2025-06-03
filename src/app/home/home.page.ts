import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonList, IonBadge,IonCardSubtitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, time, flame, body, barbellOutline, fitness, list, create } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonGrid, IonRow, IonCol, IonIcon, IonLabel, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonList, IonBadge, IonCardSubtitle
  ]
})
export class HomePage {
  // Plantilla quemada directamente en el componente con más detalles
  workoutTemplate = {
    name: 'Rutina de Fuerza Completa',
    description: 'Diseñada para desarrollar fuerza y masa muscular en todo el cuerpo',
    difficulty: 'Intermedia',
    duration: '60 minutos',
    calories: '400-500 kcal',
    exercises: [
      {
        name: 'Press de Banca',
        sets: 4,
        reps: '8-10',
        rest: '90 seg',
        muscles: 'Pecho, Tríceps, Hombros',
        equipment: 'Banco plano, Barra, Pesas',
        tips: 'Mantén los pies firmes en el suelo y arquea ligeramente la espalda'
      },
      {
        name: 'Sentadillas con Barra',
        sets: 4,
        reps: '10-12',
        rest: '120 seg',
        muscles: 'Cuádriceps, Glúteos, Isquiotibiales',
        equipment: 'Rack de sentadillas, Barra',
        tips: 'Mantén el pecho elevado y baja hasta que los muslos estén paralelos al suelo'
      },
      {
        name: 'Peso Muerto Rumano',
        sets: 3,
        reps: '10-12',
        rest: '120 seg',
        muscles: 'Espalda baja, Glúteos, Isquiotibiales',
        equipment: 'Barra o Mancuernas',
        tips: 'Mantén la espalda recta y flexiona ligeramente las rodillas'
      },
      {
        name: 'Press Militar',
        sets: 3,
        reps: '10-12',
        rest: '75 seg',
        muscles: 'Hombros, Tríceps',
        equipment: 'Barra o Mancuernas',
        tips: 'Evita arquear la espalda, mantén el core activo'
      },
      {
        name: 'Dominadas',
        sets: 3,
        reps: 'Hasta fallo',
        rest: '90 seg',
        muscles: 'Espalda, Bíceps',
        equipment: 'Barra de dominadas',
        tips: 'Inicia desde posición completa extendida y sube hasta la barbilla'
      }
    ]
  };

  constructor(private router: Router) {
    addIcons({flame,time,barbellOutline,fitness,list,barbell,create,body});
  }

  goToWorkout() {
    this.router.navigate(['/workout']);
  }

  goToExerciseLibrary() {
    this.router.navigate(['/exercises']);
  }
}