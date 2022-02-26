import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth, _signInWithEmailAndPassword, _loginWithGitHub,  _createUserWithEmailAndPassword} from '../../../firebase';
import { Router } from '@angular/router';
 import { signOut } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  userLoginStatusSubject = new BehaviorSubject<any>(this.isLoggedIn);

  constructor(private router: Router) {
    this.authStatusListener();
  }

  login(dialogRef: any, email: string, password: string): void {
    _signInWithEmailAndPassword(email, password);
    this.isLoggedIn = true;
    dialogRef.close(false);
    this.emitChanges();
  }

  getUserLoginStatus(): Observable<any> {
    return this.userLoginStatusSubject;
  }

  emitChanges() {
    this.userLoginStatusSubject.next(this.isLoggedIn);
  }

  createAccount(
    dialogRef: any,
    username: string,
    email: string,
    password: string
  ): void {
    _createUserWithEmailAndPassword(username, email, password);
    dialogRef.close(false);
    this.emitChanges();
  }

  loginWithGitHub(dialogRef: any) {
    _loginWithGitHub();
    dialogRef.close(false);
    this.emitChanges();

  }

  logout() {
    signOut(auth)
      .then(() => {
        this.isLoggedIn = false;
        this.emitChanges();
        this.userLoginStatusSubject.next(null);

        this.router.navigate(['/note-pad']);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //check localstorage for user
  checkLogin() {}

  authStatusListener() {
    auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.isLoggedIn = true;
        this.userLoginStatusSubject.next(credential);
        console.log('User is logged in');
      } else {
        this.userLoginStatusSubject.next(null);
      }
    });
    this.emitChanges();
  }
}
