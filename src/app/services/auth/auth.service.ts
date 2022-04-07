import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth, _signInWithEmailAndPassword, _loginWithGitHub,  _createUserWithEmailAndPassword} from '../../../firebase';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
  @Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  userLoginStatusSubject = new BehaviorSubject<any>(this.isLoggedIn);

  constructor(private router: Router, private toastr: ToastrService) {
    auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.isLoggedIn = true;
        console.log("userLoginRetrieved", this.isLoggedIn);
        // console.log('logged in');
        this.userLoginStatusSubject.next(credential);
      }  
    });

  }



  login(dialogRef: any, email: string, password: string): void {
    _signInWithEmailAndPassword(email, password);
    this.toastr.success('Logged in successfully');
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.emitChanges();
    dialogRef.close(false);
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
    this.toastr.success('Account created and logged in successfully');
    localStorage.setItem('isLoggedIn', 'true');

    this.isLoggedIn = true;
    this.emitChanges();
    dialogRef.close(false);
  }

  async loginWithGitHub (dialogRef: any) {
    await _loginWithGitHub().then((res) => {
      console.log("result:", res);
      this.toastr.success('Github login successful');
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;
      this.emitChanges();
      dialogRef.close(false);
    });
  }

  logout() {
    signOut(auth)
      .then(() => {
        this.router.navigate(['/home']);
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        this.emitChanges();
        this.toastr.success('Logout successful');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //check localstorage for user
  checkLogin() : boolean {
    let isLoggedIn_ = String(localStorage.getItem('isLoggedIn'));
    let result : boolean = (JSON.parse(isLoggedIn_) === true);

    return result || this.isLoggedIn;
  }

  authStatusListener() {
    auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.isLoggedIn = true;
        this.userLoginStatusSubject.next(credential);
      }
    });
      
    this.emitChanges();
  }
}
