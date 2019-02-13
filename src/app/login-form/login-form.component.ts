import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username;
  pass;
  constructor(private router: Router) { }

  ngOnInit() {

  }
  userName(value: any) {
    this.username = '';
    this.username += value;
  }
  password(value: any) {
    this.pass = '';
    this.pass += value;
  }
  goToHome() {
    if (this.username === 'admin' && this.pass === 'admin') {
      this.router.navigateByUrl('/home');
    } else {
      alert('Wrong username or password');
    }
  }
}

