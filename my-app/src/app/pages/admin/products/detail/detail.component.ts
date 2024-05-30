import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, CurrencyPipe, HeaderComponent, FooterComponent, NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
          // Handle error appropriately
        }
      );
    }
  }
}
