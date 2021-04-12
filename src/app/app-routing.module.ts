import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'galerie',
    loadChildren: () => import('./features/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'kalender',
    loadChildren: () => import('./features/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'editor',
    //canActivate: [AuthGuard],
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
