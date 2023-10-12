import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  RegisterFormGroup: FormGroup= {} as FormGroup;
  successfulRegister: boolean;
  newEmail: string= "";
  newPassw: string= "";

  constructor(private fb: FormBuilder, private accService: AccountService) {
    this.RegisterFormGroup= fb.group({
      email: [null, [Validators.required, Validators.maxLength(35)]],
      password: [null, [Validators.required]]
    });

    this.successfulRegister= false;
  }

  private clearForm(): void {
    this.RegisterFormGroup.get("email")!.reset();
    this.RegisterFormGroup.get("password")!.reset();
  }

  addAccount(): void {
    if (this.RegisterFormGroup.invalid) {
      alert("Uzupełnij dane w poprawny sposób");
      return;
    }

    this.newEmail= this.RegisterFormGroup.get("email")!.value;
    this.newPassw= this.RegisterFormGroup.get("password")!.value;
    
    if (this.accService.makeNewAccount(this.newEmail, this.newPassw)) {
      this.successfulRegister= true;
      this.clearForm();
    }
  }

  // signInWithData(): any {
  //   this.accService.signIn(this.newEmail, this.newPassw);
  //   this.newEmail= "";
  //   this.newPassw= "";
  // }
}
