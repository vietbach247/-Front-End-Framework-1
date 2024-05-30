import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../servers/product/product.service';
import { User } from '../../../../types/User';
import { AuthService } from '../../../servers/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Xác nhận mật khẩu không đúng';
      return;
    }

    const user = {
      name: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.authService.register(user).subscribe(
      (response) => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
