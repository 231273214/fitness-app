// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: Auth) {}

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.afAuth, email, password));
  }
}