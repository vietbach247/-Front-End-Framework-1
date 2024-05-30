import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class ProductEditComponent implements OnInit {
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
  _id!: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this._id).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this._id, this.product).subscribe(
      (response) => {
        alert('Sửa sản phẩm thành công');
        console.log(response);
        this.router.navigate(['/admin/products/list']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}
