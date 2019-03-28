import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: './modules/login/login.module#LoginPageModule'
  },
  {
    path: 'app', loadChildren: './modules/tabs/tabs.module#TabsPageModule',
    canActivate: [RouteGuard]
  },
  { path: 'settings', loadChildren: './modules/tabs/settings/settings.module#SettingsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
