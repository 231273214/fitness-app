import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Añadido Router y RouterLink
import { AuthService } from '../../core/auth.service';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton,
  IonNote,
  IonLabel,
  IonRouterLink
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    FormsModule, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonNote,
    IonRouterLink,
    IonLabel,
    RouterLink
  ]
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router, 
    public authService: AuthService) {}

  register() {
    if (this.authService.isValidEmail(this.email) && this.password.length >= 6) {
      this.authService.register(this.email, this.password);
    }
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}