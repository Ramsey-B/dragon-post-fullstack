import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User, CreateUser } from '../Models/User';
import { map } from 'rxjs/operators';
import { PostService} from './post.service';
import { Router } from '@angular/router'

@Injectable()
export class DataService {

  private baseUrl = "//localhost:5000/";
  HttpOptions = {
    withCredentials: true,
    timeout: 3000
  };

  constructor(private http:Http, private _postService:PostService, private _router:Router) { 
    console.log("connected to server...");
  }

  getPosts(){
    this.http.get(this.baseUrl + 'post', this.HttpOptions)
      .pipe(map(res => res.json())).subscribe(posts => {
        this._postService.updatePosts(posts);
      })
  }

}
