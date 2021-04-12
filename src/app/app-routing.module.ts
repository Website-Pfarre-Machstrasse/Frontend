import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /*{
    path: '',
    component: HomePageComponent
  },*/
  {
    path: 'galerie',
    loadChildren: () => import('./features/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'editor',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./features/editor/editor.module').then(mod => mod.EditorModule)
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
