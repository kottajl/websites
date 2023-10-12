import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  LogInFormGroup: FormGroup= {} as FormGroup;

  constructor(private fb: FormBuilder, private accService: AccountService) {
    this.LogInFormGroup= fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  trySignIn(): void {
    if (this.LogInFormGroup.invalid) {
      alert("Wpisz dane w poprawny sposób");
      return;
    }

    let myEmail= this.LogInFormGroup.get("email")!.value;
    let myPassw= this.LogInFormGroup.get("password")!.value;
    this.accService.signIn(myEmail, myPassw);
  }

}
