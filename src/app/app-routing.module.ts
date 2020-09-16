import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [


  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    ,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then(m => m.ViewPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'viewproduct',
    loadChildren: () => import('./viewproduct/viewproduct.module').then(m => m.ViewproductPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'productrecovery',
    loadChildren: () => import('./productrecovery/productrecovery.module').then(m => m.ProductrecoveryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'specialuser',
    loadChildren: () => import('./specialuser/specialuser.module').then(m => m.SpecialuserPageModule),
    canActivate: [AuthGuardService]
  },  {
    path: 'discountdetails',
    loadChildren: () => import('./discountdetails/discountdetails.module').then( m => m.DiscountdetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
