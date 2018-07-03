import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { DataService } from '../../Services/data.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user = {
    email: "",
    username: "",
    password: ""
  }
  currentUser: User

  constructor(private server:DataService, private _userService:UserService) { }

  ngOnInit() {
    this.server.authenticate()
  }

  createUser() {
    this.server.registerUser(this.user);
  }

  loginUser() {
    this.server.loginUser(this.user);
  }
}
