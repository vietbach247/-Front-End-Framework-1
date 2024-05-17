import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css',
})
export class barComponent {}
