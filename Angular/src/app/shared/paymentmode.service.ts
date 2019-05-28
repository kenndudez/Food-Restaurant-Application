import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentMode } from './paymentmode.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentmodeService {
  formData: PaymentMode;
  paymentList: PaymentMode[];
  constructor(private http: HttpClient) { }

  getPaymentList(){
    return this.http.get(environment.apiURL+'/PaymentMode').toPromise();
  }

 
  
  saveOrUpdatePayment(formData : PaymentMode){
    return this.http.post(environment.apiURL +'/PaymentMode',formData); 
     }

}
