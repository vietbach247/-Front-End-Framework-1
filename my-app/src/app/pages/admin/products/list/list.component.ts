import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product/product.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [NgIf, CurrencyPipe, NgFor, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
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

  handleDeleteProduct(_id: string | undefined): void {
    console.log('Delete product function called with productId:', _id);

    if (_id) {
      if (confirm('Bạn muốn xóa sản phẩm này không?')) {
        this.productService.deleteProduct(_id).subscribe(
          () => {
            this.products = this.products.filter(
              (product) => product._id !== _id
            );
            alert('Xóa sản phẩm thành công');
          },
          (error) => {
            console.error('Xóa sản phẩm không thành công:', error);
          }
        );
      }
    } else {
      console.error('Product ID is undefined');
    }
  }
}
