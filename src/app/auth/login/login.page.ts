import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonInput, 
  IonButton 
} from '@ionic/angular/standalone';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  email: string = '';  // <-- Añade esta propiedad
  password: string = ''; // <-- Añade esta propiedad

  private authService = inject(AuthService);
  private router = inject(Router);

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error de autenticación. Verifica tus credenciales.');
    }
  }
}