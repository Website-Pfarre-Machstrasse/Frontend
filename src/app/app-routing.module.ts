import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  /*{
    path: '',
    component: HomePageComponent
  },*/
  {
    path: 'editor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/editor/editor.module').then(mod => mod.EditorModule)
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
