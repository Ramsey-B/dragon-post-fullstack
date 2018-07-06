export class Comment {
  constructor(public body: string, public id: number, public authorId: string, public img: string, public postId: number) {};
}

export class CreateComment {
  static create(event: Comment) {
    return new Comment(event.body, event.id, event.authorId, event.img, event.postId);
  }
}