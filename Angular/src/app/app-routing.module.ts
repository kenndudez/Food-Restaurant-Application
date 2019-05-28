import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { CustomersComponent } from './orders/customers/customers.component';
import { PaymentmodeComponent } from './orders/paymentmode/paymentmode.component';
import { AuthGuard } from './auth/auth.guard';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

const routes: Routes = [
  
 //{ path: 'home', component: HomeComponent },
 // {path:'',redirectTo:'order',pathMatch:'full' },
 {path:'',redirectTo:'/user/signin',pathMatch:'full'},
  {path:'orders',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'customers',component:CustomersComponent},
  {path:'payments',component:PaymentmodeComponent},
  {path:'order',children:[
    {path:'',component:OrderComponent},  
    {path:'edit/:id',component:OrderComponent},
  ]},
  
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent }
    ]
  },
 // { path : '', redirectTo:'/login', pathMatch : 'full'}
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
