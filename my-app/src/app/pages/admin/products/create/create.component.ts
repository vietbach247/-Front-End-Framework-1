import { Component } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class ProductCreateComponent {
  product: Product = {
    title: '',
    description: '',
    images: '',
    thumbnail: '',
    category: '',
    brand: '',
    stock: 0,
    rating: 0,
    discountPercentage: 0,
    price: 0,
  };
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        alert('Tạo sản phẩm thành công:');
        console.log(response);
        this.router.navigate(['/admin/products/list']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
