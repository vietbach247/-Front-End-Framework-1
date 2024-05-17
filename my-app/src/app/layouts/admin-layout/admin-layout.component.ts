import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { barComponent } from '../../components/bar/bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,

  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports: [RouterOutlet, SidebarComponent, barComponent],
})
export class AdminLayoutComponent {}

export class AdminLayoutModule {}
