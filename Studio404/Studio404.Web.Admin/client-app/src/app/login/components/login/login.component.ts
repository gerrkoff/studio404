import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResultEnum } from '../../models/login-result-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  isProcessing: boolean;
  loginResult: LoginResultEnum;
  LoginResutEnum = LoginResultEnum;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.isProcessing = false;
    this.loginResult = null;
  }

  onSubmitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    if (!this.validateForm.invalid)
      this.login(this.validateForm.controls.username.value, this.validateForm.controls.password.value);
  }

  private async login(username: string, password: string): Promise<void> {
    this.isProcessing = true;
    this.loginResult = null;
    try {
      this.loginResult = await this.loginService.login({username, password});
      if (this.loginResult === LoginResultEnum.Success)
        location.replace("/");
    }
    finally {
      this.isProcessing = false;
    }
  }
}
