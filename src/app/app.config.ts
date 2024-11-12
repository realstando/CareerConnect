import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"careerconnect-a5e78","appId":"1:1064873679635:web:604bfd6ddc307de1a5d8e6","storageBucket":"careerconnect-a5e78.firebasestorage.app","apiKey":"AIzaSyDDj-kceIH1c5xQYcjV5nAucgA2uzlyX78","authDomain":"careerconnect-a5e78.firebaseapp.com","messagingSenderId":"1064873679635","measurementId":"G-N679B8T2JJ"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
