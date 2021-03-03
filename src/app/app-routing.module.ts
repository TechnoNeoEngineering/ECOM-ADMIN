import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'layer1',
    loadChildren: () => import('./layer1/layer1.module').then( m => m.Layer1PageModule)
  },
  {
    path: 'layer2',
    loadChildren: () => import('./layer2/layer2.module').then( m => m.Layer2PageModule)
  },
  {
    path: 'layer2confirmation',
    loadChildren: () => import('./layer2confirmation/layer2confirmation.module').then( m => m.Layer2confirmationPageModule)
  },
  {
    path: 'layer1confirmation',
    loadChildren: () => import('./layer1confirmation/layer1confirmation.module').then( m => m.Layer1confirmationPageModule)
  },
  {
    path: 'layer1pin',
    loadChildren: () => import('./layer1pin/layer1pin.module').then( m => m.Layer1pinPageModule)
  },
  {
    path: 'layer2pin',
    loadChildren: () => import('./layer2pin/layer2pin.module').then( m => m.Layer2pinPageModule)
  },
  {
    path: 'resetpin',
    loadChildren: () => import('./resetpin/resetpin.module').then( m => m.ResetpinPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
