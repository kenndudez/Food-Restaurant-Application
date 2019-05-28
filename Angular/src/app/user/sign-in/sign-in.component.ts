import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  OnSubmit(UserName,Password){
     this.userService.userAuthentication(UserName,Password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/order']);
    },
    err => {
      if (err.status == 400)
        this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      else
        console.log(err);
    });
  }

}
