import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servers/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.name = user.name;
    }
  }

  logout(): void {
    const confirmation = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (confirmation) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
    }
  }
}
