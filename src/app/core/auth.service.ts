import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone
  ) {
    authState(this.auth).subscribe(user => {
      this.authState.next(!!user);
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      this.validateCredentials(email, password);
      
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.redirectTo('/login');
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.redirectTo('/home');
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.redirectTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  private validateCredentials(email: string, password: string): void {
    if (!this.isValidEmail(email)) {
      throw new Error('Formato de email inválido');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  private handleAuthError(error: any): void {
    const errorMap: Record<string, string> = {
      'auth/invalid-email': 'Email inválido',
      'auth/email-already-in-use': 'Email ya registrado',
      'auth/weak-password': 'Contraseña débil (mínimo 6 caracteres)',
      'auth/user-not-found': 'Email no registrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde'
    };

    throw new Error(errorMap[error.code] || error.message);
  }

  private redirectTo(path: string): void {
    this.ngZone.run(() => {
      this.router.navigate([path]);
    });
  }

  public isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}