import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = []

  subscription!: Subscription

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts()
    this.subscription = this.postsService.postsChangedEvent.subscribe((posts: Post[]) => this.posts = posts)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
