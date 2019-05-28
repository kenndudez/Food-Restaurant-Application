import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  formData: Customer;
  customerList: Customer[];
  constructor(private http: HttpClient) { }

  getCustomerList(){
    return this.http.get(environment.apiURL+'/Customer').toPromise();
  }

   
  saveOrUpdateOrders(formData : Customer){
    return this.http.post(environment.apiURL +'/Customer',formData); 
     }
}


