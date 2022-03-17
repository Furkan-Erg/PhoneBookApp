import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/auth/login/LoginRequest';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router:Router
  ) {}

  prepareForm() {
    this.loginForm = this.formBuilder.group({
      Email: [null],
      Password: [null],
    });
  }
  ngOnInit(): void {
    this.prepareForm();
  }

  loginButtonOnTap() {
    console.log("click");
    const loginDto = Object.assign(new LoginRequest(), this.loginForm.value);
    console.log(loginDto);

    this.authService.login(loginDto).subscribe((e) => {
      if(e.success){
          localStorage.setItem("userId",e.userId.toString())
          this.router.navigate(["/contact"])

      };

    });
  }
}
