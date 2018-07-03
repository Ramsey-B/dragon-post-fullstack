import { Injectable } from '@angular/core';
import { User } from '../Models/User'
import { DataService } from './data.service'
import { BehaviorSubject } from "rxjs"

@Injectable()
export class UserService {
  private user = new BehaviorSubject<User>(null);
  cast = this.user.asObservable();

  constructor() { }

  ngOnInit() {

  }

  updateUser(newUser){
    this.user.next(newUser);
  }
}
