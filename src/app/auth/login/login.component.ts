import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../../shared/models/login-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  LoginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      const payload: LoginRequest = this.LoginForm.value;
      this.authService.login(payload).subscribe({
        next: (res) => {
          console.log('✅ Login Success:', res);
          localStorage.setItem('authToken', res.token); // Save token
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('❌ Login Failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
    else {
      this.LoginForm.markAllAsTouched();
    }
  }
}
