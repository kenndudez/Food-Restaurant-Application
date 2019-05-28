import { BrowserModule } from '@angular/platform-browser';

import { UserService } from './shared/user.service';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { Order } from './shared/order.model';
import { OrderService } from './shared/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CustomersComponent } from './orders/customers/customers.component';
import { PaymentmodeComponent } from './orders/paymentmode/paymentmode.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,
    CustomersComponent,
    PaymentmodeComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar : true
    })
  ],
  entryComponents:[OrderItemsComponent],
  providers: [OrderService,UserService,AuthGuard,
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
