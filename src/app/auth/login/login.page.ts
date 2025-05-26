import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Añadido Router y RouterLink
import { AuthService } from '../../core/auth.service';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton,
  IonLabel,
  IonRouterLink 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonRouterLink, // Necesario para routerLink en ion-button
    RouterLink // Necesario para funcionalidad de enrutamiento
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inyectamos Router para navegación programática
  ) {}

  login() {
    this.authService.login(this.email, this.password);
  }

  // Método alternativo por si prefieres navegación programática
  goToRegister() {
    this.router.navigate(['/register']);
  }
}