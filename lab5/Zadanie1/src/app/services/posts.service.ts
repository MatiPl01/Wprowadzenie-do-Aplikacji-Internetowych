import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Post } from '../shared/models/post.model';
import { HttpHeaders } from '@angular/common/http';

const headers = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
    })
}

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    postsJsonPath: string = 'https://jsonplaceholder.typicode.com/posts/?_limit=25'
    postsChangedEvent = new EventEmitter<Post[]>()
    posts: Post[] = []
    maxUserID: number = 1
    userPostID: number = 1

    constructor(private http: HttpClient) {
        this.http
            .get<Post>(this.postsJsonPath)
            .subscribe(this.loadPosts.bind(this))
    }

    getPosts(): Post[] {
        return this.posts
    }

    addPost(post: Post): void {
        this.http.post<Post>(this.postsJsonPath, post, headers).subscribe()
        this.posts.push(post)
        this.postsChangedEvent.emit(this.posts.slice())
    }

    getIds() {
        return {
            userId: this.maxUserID + 1,
            id: this.userPostID++
        }
    }

    private loadPosts(posts: any) {
        posts.forEach((post: Post) => {
            if (post.userId > this.maxUserID) this.maxUserID = post.userId
        })
        this.posts = posts
        this.postsChangedEvent.emit(posts)
    }
}
