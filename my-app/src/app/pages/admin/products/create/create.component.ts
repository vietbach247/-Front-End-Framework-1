import { Component } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class ProductCreateComponent {
  product: Product = {
    title: '',
    description: '',
    image: '', // Note: Changed to `images` to be consistent
    thumbnail: '',
    category: '',
    brand: '',
    stock: 0,
    rating: 0,
    discountPercentage: 0,
    price: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        alert('Tạo sản phẩm thành công:');
        console.log(response);
        this.router.navigate(['/admin/products/list']);
      },
      (error) => {
        alert('Error creating product:' + error.message);
      }
    );
  }
}
