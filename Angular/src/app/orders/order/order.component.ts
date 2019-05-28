import { CustomerService } from './../../shared/customer.service';
import { OrderService } from './../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentMode } from 'src/app/shared/paymentmode.model';
import { PaymentmodeService } from 'src/app/shared/paymentmode.service';
import { UserService } from 'src/app/shared/user.service';
import { CustomersComponent } from '../customers/customers.component';
import { PaymentmodeComponent } from '../paymentmode/paymentmode.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  paymentList : PaymentMode[];
  customerList: Customer[];
  isValid: boolean = true;
  userDetails: [];

  constructor(private service: OrderService,
    private dialog: MatDialog,
    private paymentService: PaymentmodeService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private userservice: UserService) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      this.resetForm();
    else {
      this.service.getOrderByID(parseInt(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
        this.userservice = res.userDetails
      });
    }
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);

    this.paymentService.getPaymentList().then(res => this.paymentList = res as PaymentMode[]);

    this.userservice.getUserClaims().then(res => this.userDetails = res as []);
  }
    resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      OrderID: null,
      PaymentID:null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PayMode: '',
      GTotal: 0,
      DeletedOrderItemIDs: ''
    };
    this.service.orderItems = [];
  }
  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }
  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
    this.service.formData.DeletedOrderItemIDs += orderItemID + ",";
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }
  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }
  validateForm() {
    this.isValid = true;
    if (this.service.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Restaurent App.');
        this.router.navigate(['/orders']);
      })
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/signin']);
  }


  //Customers PoP up
  resetFormCustomer(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.customerService.formData = {
      CustomerID: null,
      Name: ''
    };
    this.customerService.customerList = [];
  }

  
  saveOrUpdates(form : NgForm){
    this.customerService.saveOrUpdateOrders(form.value).subscribe(res=> {
    });
  }

  AddOrEditCustomers(orderItemIndex, OrderID, form: NgForm ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(CustomersComponent, dialogConfig).afterClosed().subscribe(res => {
      this.resetForm(form);
    // this.toastr.success("Inserted Sucessfully!", 'Customer Name');
    });
  }




  //PaymentMode Pop up
  saveOrUpdate(form : NgForm){
    this.paymentService.saveOrUpdatePayment(form.value).subscribe(res=> {
    });
  }

  resetForms(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.paymentService.formData = {
      PaymentID: null,
      PayMode: ''
    };
    this.paymentService.paymentList = [];
  }
  AddOrEditPayment(PaymentIndex, OrderID, form: NgForm) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { PaymentIndex, OrderID };
    this.dialog.open(PaymentmodeComponent, dialogConfig).afterClosed().subscribe(res => {
      this.resetForm(form);
   //  this.toastr.success("Inserted Sucessfully!", 'Customer Name');
    });
  }
}
