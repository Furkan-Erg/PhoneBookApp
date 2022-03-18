import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/auth/register/RegisterRequest';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router:Router
  ) {}

  prepareForm() {
    this.registerForm = this.formBuilder.group({
      Name: [null,[Validators.required,Validators.pattern("^[^0-9 ]+$")]],
      Surname:[null,[Validators.required,Validators.pattern("^[^0-9 ]+$")]],
      Email: [null,[Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: [null],
      TermsOfService:[false,[Validators.requiredTrue]]
    });
  }
  ngOnInit(): void {
    this.prepareForm();
  }

  get Email(){
    return this.registerForm.get('Email')
    }

  get Password(){
    return this.registerForm.get('Password')
  }

  registerButtonOnTap() {
    console.log("click");
    const registerDto = Object.assign(new RegisterRequest(), this.registerForm.value);

    console.log(registerDto);



    this.authService.register(registerDto).subscribe((e)=>{
      if(e.success){
        this.router.navigate(["/login"])

    };
    })
  }

}
