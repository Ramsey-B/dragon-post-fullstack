import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '@angular/compiler';

@Injectable()
export class CommentService {
  private comments = new BehaviorSubject<Comment[]>(null);
  castComments = this.comments.asObservable();

  constructor() { }

  updateComments(comments: Comment[]) {
    this.comments.next(comments);
  }

  addComment(Comment: Comment) {
    this.comments.value.unshift(Comment);
  }
}
