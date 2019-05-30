import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  constructor(private userService: UserService, private toastr: ToastrService) { }
 
  ngOnInit() {
    this.resetForm();
  }
 
  resetForm(form?: NgForm) {
    if (form = null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      ConfirmPassword: ''
    }
  }
 
  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe(data => {
        {
          this.resetForm(form);
          this.toastr.success('Login To Your Email To Confirm Registration');
        }
    });   
  }
}