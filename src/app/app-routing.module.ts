import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [


  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
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
  },
  {
    path: 'discountdetails',
    loadChildren: () => import('./discountdetails/discountdetails.module').then( m => m.DiscountdetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'ordertracking',
    loadChildren: () => import('./ordertracking/ordertracking.module').then( m => m.OrdertrackingPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pushnotification',
    loadChildren: () => import('./pushnotification/pushnotification.module').then( m => m.PushnotificationPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'stockdetails',
    loadChildren: () => import('./stockdetails/stockdetails.module').then( m => m.StockdetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'invoice-bill',
    loadChildren: () => import('./invoice-bill/invoice-bill.module').then( m => m.InvoiceBillPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'specialuserrequest',
    loadChildren: () => import('./specialuserrequest/specialuserrequest.module').then( m => m.SpecialuserrequestPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'delivery-charges',
    loadChildren: () => import('./delivery-charges/delivery-charges.module').then( m => m.DeliveryChargesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'queries',
    loadChildren: () => import('./queries/queries.module').then( m => m.QueriesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'lowerstocks',
    loadChildren: () => import('./lowerstocks/lowerstocks.module').then( m => m.LowerstocksPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'gst',
    loadChildren: () => import('./gst/gst.module').then( m => m.GstPageModule)
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule)
  },  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'adminusers',
    loadChildren: () => import('./adminusers/adminusers.module').then( m => m.AdminusersPageModule)
  },
  {
    path: 'productrequests',
    loadChildren: () => import('./productrequests/productrequests.module').then( m => m.ProductrequestsPageModule)
  },
  {
    path: 'layerconfirmation',
    loadChildren: () => import('./layerconfirmation/layerconfirmation.module').then( m => m.LayerconfirmationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
