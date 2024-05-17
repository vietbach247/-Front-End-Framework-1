import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { ProductDetailComponent } from './pages/admin/products/detail/detail.component';
import { ProductCreateComponent } from './pages/admin/products/create/create.component'; // Import component for create
import { ProductEditComponent } from './pages/admin/products/edit/edit.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/detail/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
      },

      {
        path: 'products/create',
        component: ProductCreateComponent,
      },
    ],
  },
  {
    path: 'products/detail/:id',
    component: ProductDetailComponent,

    children: [
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
    ],
  },
];
