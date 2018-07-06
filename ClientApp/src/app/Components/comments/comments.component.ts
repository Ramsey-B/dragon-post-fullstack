import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { CommentService } from '../../Services/comment.service';
import { UserService } from '../../Services/user.service';
import { PostService } from '../../Services/post.service';
import { User } from '../../Models/User';
import { Post } from '../../Models/Post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments:Comment[];
  comment = {
    Body: "",
    Img: ""
  }
  user: User
  post: Post

  constructor(private _server:DataService, private _commentService:CommentService, private _userService:UserService, private _postService:PostService) { }

  ngOnInit() {
    this._commentService.castComments.subscribe(comments => {
      this.comments = comments;
    })
    this._postService.castCurrentPost.subscribe(post => {
      this.post = post
    })
    this._userService.cast.subscribe(user => {
      this.user = user
    })
  }

  createComment() {
    debugger
    this.comment["AuthorId"] = this.user.id
    this.comment["PostId"] = this.post.id
    this._server.createComment(this.comment);
  }

}
