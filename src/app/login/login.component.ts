import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  get Email(){
    return this.loginForm.get('Email')
    }
  get Password(){
    return this.loginForm.get('Password')
  }
  prepareForm() {
    this.loginForm = this.formBuilder.group({
      Email: [null,[Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: [null,[Validators.required,]],
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
      } else {
        Swal.fire(
          'Your Email Or Password is wrong'
        );
      }
    });
  }
}
