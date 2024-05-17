import { Component } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../servers/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, CurrencyPipe, HeaderComponent, FooterComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  product: Product | undefined;
  productId!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getProduct(this.productId);
    });
  }

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
