import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { Post } from '../Models/Post'

@Injectable()
export class PostService {
  private posts = new BehaviorSubject<Post[]>(null);
  cast = this.posts.asObservable();

  constructor() { }

  ngOnInit() {

  }

  updatePosts(newPosts){
    this.posts.next(newPosts);
  }
}
