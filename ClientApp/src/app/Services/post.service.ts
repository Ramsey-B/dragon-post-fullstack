import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { Post } from '../Models/Post'
import { Tag } from '../Models/Tag';

@Injectable()
export class PostService {
  private posts = new BehaviorSubject<Post[]>(null);
  cast = this.posts.asObservable();
  private currentPost = new BehaviorSubject<Post>(null);
  castCurrentPost = this.currentPost.asObservable();
  private tags = new BehaviorSubject<Tag[]>(null);
  castTags = this.tags.asObservable();

  constructor() { }

  ngOnInit() {

  }

  setCurrentPost(post:Post) {
    this.currentPost.next(post);
  }

  updatePosts(newPosts){
    this.posts.next(newPosts);
  }

  addPost(post: Post) {
    this.posts.value.unshift(post);
  }

  updateTags(tags:Tag[]){
    this.tags.next(tags)
  }

  removePost(id: number) {
    var i = this.posts.value.findIndex(post => {
      return post.id == id;
    })
    this.posts.value.splice(i, 1);
  }
}
