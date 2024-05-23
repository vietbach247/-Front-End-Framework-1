import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../types/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'products').pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl + 'products'}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + 'products', product).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl + 'products'}/${id}`, product)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl + 'products'}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl + 'products'}?search=${searchTerm}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi không xác định!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi phía client: ${error.error.message}`;
    } else {
      errorMessage = `Server trả về mã lỗi: ${error.status}, thông báo lỗi: ${error.message}`;
    }
    console.error(errorMessage);

    alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');

    if (error.status === 404) {
      this.router.navigate(['/not-found']);
    }

    return throwError(errorMessage);
  }
}
