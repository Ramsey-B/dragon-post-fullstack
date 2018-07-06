import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service'
import { DataService } from '../../Services/data.service'
import { UserService } from '../../Services/user.service'
import { Post } from '../../Models/Post'
import { User } from '../../Models/User';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  currentUser: User;
  tagBool: boolean = false;
  postBool: boolean = false;
  tags = [];
  tag = {
    Name: ""
  }
  post = {
    Title: "",
    Body: "",
    Img: ""
  }

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

  toggleTags() {
    this.tagBool = !this.tagBool;
  }

  togglePosts() {
    this.postBool = !this.postBool;
  }

  addTag() {
    var newTag = this.tag
    this.tags.unshift(newTag)
    this.tag = {
      Name: ""
    }
  }

  removeTag(i) {
    this.tags.splice(i, 1);
  }

  createPost() {
    var newPost = {
      Title: this.post.Title,
      Body: this.post.Body,
      Img: this.post.Img
    }
    var newTags = this.tags
    this._server.createPost(newPost, newTags);
    this.post = {
      Title: "",
      Body: "",
      Img: ""
    }
    this.tags = []
    this.tag = {
      Name: ""
    }
  }

  deletePost(id: number) {
    this._server.deletePost(id);
  }
}
