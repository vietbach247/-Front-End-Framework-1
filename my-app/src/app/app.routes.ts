import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { ProductDetailComponent } from './pages/admin/products/detail/detail.component';
import { ProductCreateComponent } from './pages/admin/products/create/create.component'; // Import component for create
import { ProductEditComponent } from './pages/admin/products/edit/edit.component';
import { ProductLayoutComponent } from './layouts/product-layout/product-layout.component';
import { ProductHomeComponent } from './pages/product/home/home.component';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { LoginComponent } from './pages/product/login/login.component';
import { RegisterComponent } from './pages/product/register/register.component';
import { ForgotPasswordComponent } from './pages/product/forgot-password/forgot-password.component';
import { AuthGuard } from './pages/product/login/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductHomeComponent,
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'not-found', component: NotFoundComponentComponent },

  { path: '**', redirectTo: '/not-found' },
];
