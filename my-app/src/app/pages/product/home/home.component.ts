import { Component } from '@angular/core';
import { Product } from '../../../../types/Product';
import { ProductService } from '../../../servers/product.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class ProductHomeComponent {
  products: Product[] = [];
  searchTerm: string = '';
  searchTimeout: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  searchProducts(): void {
    if (this.searchTerm.trim() !== '') {
      this.productService
        .searchProducts(this.searchTerm)
        .subscribe((data: Product[]) => {
          this.products = data;
        });
    } else {
      this.getProducts();
    }
  }

  onInputChange(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchProducts();
    }, 800);
  }
}
