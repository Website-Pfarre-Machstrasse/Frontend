import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: ':cat/:page',
    loadChildren: () => import('./features/page-renderer/page-renderer.module').then(m => m.PageRendererModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
