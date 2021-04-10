import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'editor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/editor/editor.module').then(mod => mod.EditorModule)
  },
  {
    path: 'kalender',
    loadChildren: () => import('./features/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'galerie',
    loadChildren: () => import('./features/gallery/gallery.module').then(m => m.GalleryModules)
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
