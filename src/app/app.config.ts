// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC3W05vM9D8lfLIDQlpOUYqptaZ1_iU-X0",
    authDomain: "fitnessapp-c9a7e.firebaseapp.com",
    projectId: "fitnessapp-c9a7e",
    storageBucket: "fitnessapp-c9a7e.firebasestorage.app",
    messagingSenderId: "623550487941",
    appId: "1:623550487941:web:1aa85fc2af22880d95f8ec",
    measurementId: "G-2V4J9YGVJF"
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideIonicAngular(),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth())
    ]
};