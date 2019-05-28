import { Component, OnInit } from '@angular/core';
import { PaymentmodeService } from 'src/app/shared/paymentmode.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PaymentMode } from 'src/app/shared/paymentmode.model';



@Component({
  selector: 'app-paymentmode',
  templateUrl: './paymentmode.component.html',
  styleUrls: ['./paymentmode.component.css']
})
export class PaymentmodeComponent implements OnInit {
  isValid: boolean = true;
  formData: PaymentMode;
  paymentList: PaymentMode[];
  constructor(
    private paymentService: PaymentmodeService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.paymentService.getPaymentList().then(res => this.paymentList = res as PaymentMode[]);
      this.formData = {
        PaymentID: null,
        PayMode: '',
      }
  }
 
  validateForm() {
    this.isValid = true;
    if (this.paymentService.formData.PaymentID == 0)
      this.isValid = false;
    else if (this.paymentService.paymentList.length == 0)
      this.isValid = false;
    return this.isValid;
  }


  saveOrUpdate(form : NgForm){
    this.paymentService.saveOrUpdatePayment(form.value).subscribe(res=> {
    });
  }
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.paymentService.formData = {
      PaymentID: null,
      PayMode: ''
    };
    this.paymentService.paymentList = [];
  }


  onSubmit(form: NgForm) {
    if (form.value.PaymentID ==null) {
       {
         this.saveOrUpdate(form);
         this.resetForm(form);
        this.toastr.success("Inserted Sucessfully!", 'Payment Mode');
        this.router.navigate(['/order']);
      }
      
    }
}
}
