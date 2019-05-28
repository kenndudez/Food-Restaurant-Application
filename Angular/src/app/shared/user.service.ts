import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:61427';
  constructor(private http: HttpClient) { }
home
  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      ConfirmPassword: user.ConfirmPassword
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/Account/Register', body,{headers : reqHeader});
  }

  userAuthentication(UserName, Password) {
    var data = "UserName=" + UserName + "&Password=" + Password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/Token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return this.http.get(this.rootUrl+'/api/Account/UserInfo').toPromise();
  }
}
