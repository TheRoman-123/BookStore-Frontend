import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Constants} from "../../constants/Constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(Constants.passwordPattern)]
    ),
  });

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(data => {
        this.loading = false;
        // this.router.navigate(["/"]).then();
      });
  }

  isLoading() {
    return this.loading;
  }
}
