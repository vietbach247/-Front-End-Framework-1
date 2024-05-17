// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Đảm bảo import CommonModule

import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    NgModule,
    BrowserModule,
    HttpClientModule,
    CommonModule, // Import CommonModule tại đây
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
