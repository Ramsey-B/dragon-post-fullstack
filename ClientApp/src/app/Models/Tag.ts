export class Tag {
  constructor(public name:string, public postId:number, public id:number) {};
}

export class NewTag {
  constructor(public name:string, public postId:number) {};
}

export class CreateTag {
  static create(event: Tag) {
    return new Tag(event.name, event.postId, event.id);
  }
}

export class CreateNewTag {
  static create(event: NewTag) {
    return new NewTag(event.name, event.postId);
  }
}