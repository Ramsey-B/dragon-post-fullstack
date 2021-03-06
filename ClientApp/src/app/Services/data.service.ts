import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User, CreateUser } from '../Models/User';
import { map } from 'rxjs/operators';
import { PostService} from './post.service';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { CommentService } from './comment.service';

@Injectable()
export class DataService {

  private baseUrl = "//localhost:5000/api/";
  HttpOptions = {
    withCredentials: true,
    timeout: 3000
  };

  constructor(private http:Http, private _postService:PostService, private _router:Router, private _userService:UserService, private _commentService: CommentService) { 
    console.log("connected to server...");
  }

  getPosts(){
    this.http.get(this.baseUrl + 'post', this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(posts => {
        this._postService.updatePosts(posts);
      })
  }

  getPost(id:number) {
    this.http.get(this.baseUrl + 'post/' + id, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(post => {
        this._postService.setCurrentPost(post);
      })
  }

  authenticate() {
    this.http.get(this.baseUrl + "account/authenticate", this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(u => {
        if(u != null) {
          this._userService.updateUser(u);
          this._router.navigate(['/']);
        } else {
          this._router.navigate(['account']);
        }
      })
  }

  registerUser(newUser:Object){
    this.http.post(this.baseUrl + 'account/register', newUser, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(user => {
        this._userService.updateUser(user);
      })
  }

  loginUser(user:Object){
    this.http.post(this.baseUrl + 'account/login', user, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(u => {
        this._userService.updateUser(u.data)
        console.log(u)
      })
  }

  getTags(id: number) {
    this.http.get(this.baseUrl + 'tag/' + id, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(tags => {
        this._postService.updateTags(tags);
      })
  }

  createPost(newPost, tags) {
    debugger
    this.http.post(this.baseUrl + 'post', newPost, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(post => {
        this.addTags(post, tags)
        this._postService.addPost(post)
      })
  }

  addTags(post, tags) {
    debugger
    this.http.post(this.baseUrl + 'tag/multi/' +post.id, tags, this.HttpOptions)
    .pipe(map(res => res.json())).subscribe(t => {console.log(t)})
  }

  deletePost(id: number) {
    this.http.delete(this.baseUrl + 'post/' +id, this.HttpOptions)
    .pipe(map(res => res.json())).subscribe(post => {
      this._postService.removePost(id)
    })
  }

  getComments(id: number) {
    this.http.get(this.baseUrl + 'comment/post/' +id, this.HttpOptions)
    .pipe(map(res => res.json())).subscribe(comments => {
      this._commentService.updateComments(comments)
    })
  }

  createComment(comment: object) {
    this.http.post(this.baseUrl + 'comment', comment, this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(comment => {
        this._commentService.addComment(comment);
      })
  }
}
