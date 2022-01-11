import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  constructor(private router: Router,
              private postsService: PostsService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const post = this.createPostObject(form)
      form.reset()
      this.postsService.addPost(post)
      this.router.navigate(['/posts'])
    }
  }

  onClose() {
    this.router.navigate(['/posts'])
  }

  private createPostObject(form: NgForm): Post {
    const newPost = {
      ...this.postsService.getIds(),
      title: form.value.title,
      body: form.value.body
    }
    return newPost
  }

  private randInt(a: number, b: number) {
    return Math.floor(Math.random() * (b - a + 1) + a)
  }
}
