import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service'
import { DataService } from '../../Services/data.service'
import { Post } from '../../Models/Post'
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];

  constructor(private _server:DataService, private _postService:PostService) { }

  ngOnInit() {
    this._server.getPosts();
    this._postService.cast.subscribe(posts => {
      this.posts = posts;
      console.log(posts)
    })
  }

}
