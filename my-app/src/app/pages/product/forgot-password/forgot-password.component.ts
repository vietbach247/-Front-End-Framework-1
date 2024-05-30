import { Component } from '@angular/core';
import { AuthService } from '../../../servers/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  sendResetPassword() {
    const email = this.email;
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        sessionStorage.setItem('ResetPasswordToken', response.token);
        alert(response.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
