import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton,
  IonNote,
  IonLabel
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
    IonLabel
  ]
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService) {}

  register() {
    if (this.authService.isValidEmail(this.email) && this.password.length >= 6) {
      this.authService.register(this.email, this.password);
    }
  }
}