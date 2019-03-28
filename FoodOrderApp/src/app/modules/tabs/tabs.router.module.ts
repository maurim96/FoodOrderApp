import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RouteMyOrderGuard } from 'src/app/services/my-order-route.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'my-order',
        children: [
          {
            path: '',
            loadChildren: './my-order/my-order.module#MyOrderPageModule',
            canActivate: [RouteMyOrderGuard]
          }
        ]
      },
      {
        path: 'make-order',
        children: [
          {
            path: '',
            loadChildren: './make-order/make-order.module#MakeOrderPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: './settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'app/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
