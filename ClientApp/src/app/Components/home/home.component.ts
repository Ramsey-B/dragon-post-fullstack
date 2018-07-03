import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service'
import { DataService } from '../../Services/data.service'
import { UserService } from '../../Services/user.service'
import { Post } from '../../Models/Post'
import { User } from '../../Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  currentUser: User;

  constructor(private _server:DataService, private _postService:PostService, private _userService:UserService) { }

  ngOnInit() {
    this._server.getPosts();
    this._userService.cast.subscribe(user => {
      this.currentUser = user
    })
    this._postService.cast.subscribe(posts => {
      this.posts = posts;
      console.log(posts)
    })
  }

}
