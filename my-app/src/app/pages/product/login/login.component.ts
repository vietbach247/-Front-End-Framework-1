import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../servers/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const user = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(user).subscribe(
      (response) => {
        sessionStorage.setItem('accessToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        alert('Đăng nhập thành công');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
