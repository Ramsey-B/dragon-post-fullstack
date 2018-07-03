export class Post {
  constructor(public Title: string, public Body: string, public Id: string, public AuthorId: string) {};
}

export class NewPost {
  constructor(public Title: string, public Body: string, public AuthorId: string) {};
}

export class CreatePost {
  static create(event: Post) {
    return new Post(event.Title, event.Body, event.Id, event.AuthorId);
  }
}

export class CreateNewPost {
  static create(event: NewPost) {
    return new NewPost(event.Title, event.Body, event.AuthorId);
  }
}