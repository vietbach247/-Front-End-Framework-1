import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [NgIf, CurrencyPipe, NgFor, RouterLink],
  standalone: true,

  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  handleDeleteProduct(_id: string | undefined): void {
    console.log('Delete product function called with productId:', _id);

    if (_id) {
      if (confirm('Bạn muốn xóa sản phẩn này không?')) {
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
