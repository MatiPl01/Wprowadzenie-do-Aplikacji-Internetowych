import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoPreviewComponent } from './photos/photo-preview/photo-preview.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'albums/:albumID/photos/:photoID', component: PhotoPreviewComponent },
  { path: 'posts', component: PostsComponent, children: [
    { path: 'create', component: CreatePostComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
