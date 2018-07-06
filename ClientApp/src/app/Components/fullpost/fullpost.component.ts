import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { Post } from '../../Models/Post';
import { Tag } from '../../Models/Tag';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.css']
})
export class FullpostComponent implements OnInit {
  post: Post;
  tags: Tag[];
  postId: number;

  constructor(private _postService: PostService, private _activeRouter: ActivatedRoute, private _router: Router, private _server: DataService) {
    this._activeRouter.params.subscribe(res => this.postId = res.id);
  }

  ngOnInit() {
    if (this._router.isActive) {
      this._server.getPost(this.postId)
      this._server.getTags(this.postId);
      this._server.getComments(this.postId);
      this._postService.castCurrentPost.subscribe(post => {
        this.post = post;
        console.log(post)
      })
      this._postService.castTags.subscribe(tags => {
        this.tags = tags
      })
    }
  }

}
