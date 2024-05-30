import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servers/auth/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
