import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Constants} from "../../constants/Constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern(Constants.namePattern)
    ]),
    lastName: new FormControl('', [
      Validators.minLength(1),
      Validators.pattern(Constants.namePattern)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(Constants.phonePattern)
    ]),
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.authService.register(this.form.value)
      .subscribe(customerId => {
        alert(customerId);
        this.loading = false;
      });
  }

  isLoading() {
    return this.loading;
  }
}
