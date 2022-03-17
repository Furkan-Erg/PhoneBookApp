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
      Name: [null],
      Surname:[null],
      Email: [null],
      Password: [null],
      TermsOfService:[false,[Validators.requiredTrue]]
    });
  }
  ngOnInit(): void {
    this.prepareForm();
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
