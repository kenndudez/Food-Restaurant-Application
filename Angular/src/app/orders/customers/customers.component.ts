import { Component, OnInit, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Customer } from "src/app/shared/customer.model";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/shared/customer.service";
@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"]
})
export class CustomersComponent implements OnInit {
  formData: Customer;
  customerList: Customer[];
  isValid: boolean = true;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.customerService
      .getCustomerList()
      .then(res => (this.customerList = res as Customer[]));
    this.formData = {
      CustomerID: null,
      Name: ""
    };
  }

  validateForm() {
    this.isValid = true;
    if (this.customerService.formData.CustomerID == 0) this.isValid = false;
    else if (this.customerService.customerList.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (form.value.CustomerID == null) {
      {
        this.saveOrUpdate(form);
        this.resetForm(form);
        this.toastr.success("Inserted Sucessfully!", "Customer Name");
        this.router.navigate(["/order"]);
      }
    }
  }
  saveOrUpdate(form: NgForm) {
    this.customerService.saveOrUpdateOrders(form.value).subscribe(res => {});
  }
  resetForm(form?: NgForm) {
    if ((form = null)) form.resetForm();
    this.customerService.formData = {
      CustomerID: null,
      Name: ""
    };
    this.customerService.customerList = [];
  }
}
