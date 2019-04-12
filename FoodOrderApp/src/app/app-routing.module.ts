import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'login', loadChildren: './modules/login/login.module#LoginPageModule'
  },
  {
    path: 'app', loadChildren: './modules/tabs/tabs.module#TabsPageModule',
    canActivate: [RouteGuard]
  },
  {
    path: 'settings', loadChildren: './modules/tabs/settings/settings.module#SettingsPageModule',
    canActivate: [RouteGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
