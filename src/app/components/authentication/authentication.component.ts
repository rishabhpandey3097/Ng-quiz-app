import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';


interface userModal {
  id?: string,
  email: string,
  name: string,
  password: string
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  @ViewChild("authTabs", { static: false }) authTabs: MatTabGroup;

  constructor( private authService: AuthService) { }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  allUsers: userModal[] = [];
  authTabsIndex = 0

  ngOnInit(): void {
  }

  register() {
    this.authService.signUpWithEmail(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name)
      .then(result => {
        this.authTabsIndex = 0;
      }).catch(error => {
        console.log(error);
      })
  }
  
  login() {
    this.authService.signInWithEmailPassword(this.loginForm.value.email, this.loginForm.value.password);
  }
}
