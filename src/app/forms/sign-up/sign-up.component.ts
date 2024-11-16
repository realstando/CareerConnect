import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { createUserWithEmailAndPassword, Auth } from "@angular/fire/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SignUpComponent {
  constructor(private dialogRef: MatDialogRef<SignUpComponent>, private auth: Auth) {}

  private fb = inject(FormBuilder);
  signupForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  onSubmit(): void {
    this.dialogRef.close();
    if (this.signupForm.value.email && this.signupForm.value.password) {
      createUserWithEmailAndPassword(this.auth, this.signupForm.value.email, this.signupForm.value.password);
    }
  }

}
