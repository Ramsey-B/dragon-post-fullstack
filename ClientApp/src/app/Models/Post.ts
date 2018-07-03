export class Post {
  constructor(public title: string, public body: string, public id: string, public authorId: string, public img: string) {};
}

export class NewPost {
  constructor(public title: string, public body: string, public authorId: string, public img: string) {};
}

export class CreatePost {
  static create(event: Post) {
    return new Post(event.title, event.body, event.id, event.authorId, event.img);
  }
}

export class CreateNewPost {
  static create(event: NewPost) {
    return new NewPost(event.title, event.body, event.authorId, event.img);
  }
}