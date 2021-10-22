import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { NotifierService } from 'angular-notifier';
@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notifierService: NotifierService
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

  }

  private updateUserData(user: User, displayName: string) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
    };

    return userRef.set(data, { merge: true });
  }

  async signUpWithEmail(email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.notifierService.notify(
          'success',
          `${name} is now registered 🚀`
        );
        this.updateUserData(result.user, name);
      })
      .catch(error => {
        this.notifierService.notify(
          'error',
          error.message
        );
        throw error;
      });
  }

  async signInWithEmailPassword(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.notifierService.notify(
          'success',
          'Login successfull 🚀'
        );
        this.router.navigateByUrl('quiz');
      })
      .catch((error) => {
        this.notifierService.notify(
          'error',
          error.message
        );
        throw error;
      });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}
