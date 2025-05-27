import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async register(email: string, password: string) {
    try {
      // Validación básica de formato
      if (!this.isValidEmail(email)) {
        throw new Error('Formato de email inválido. Ejemplo: usuario@dominio.com');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user.email);
      this.router.navigate(['/login']);
      return true;
    } catch (error: any) {
      let errorMessage = 'Error en registro: ';
      
      switch(error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Email inválido. Debe tener formato usuario@dominio.com';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        default:
          errorMessage += error.message;
      }

      alert(errorMessage);
      return false;
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']);
      return true;
    } catch (error: any) {
      let errorMessage = 'Error en login: ';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email o contraseña incorrectos';
      } else {
        errorMessage += error.message;
      }

      alert(errorMessage);
      return false;
    }
  }

  public isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}