import { Routes } from '@angular/router';
import { SellerdashboardComponent } from './components/seller/sellerdashboard/sellerdashboard.component';
import { PurchasehistoryComponent } from './components/seller/purchasehistory/purchasehistory.component';
import { AddproductComponent } from './components/seller/addproduct/addproduct.component';
import { CustomerdashboardComponent } from './components/customer/customerdashboard/customerdashboard.component';
import { OrderhistoryComponent } from './components/customer/orderhistory/orderhistory.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { RoleselectionComponent } from './components/auth/roleselection/roleselection.component';
import { SLoginComponent } from './components/auth/seller/login/login.component';
import { SSignupComponent } from './components/auth/seller/signup/signup.component';
import { CLoginComponent } from './components/auth/customer/login/login.component';
import { CSignupComponent } from './components/auth/customer/signup/signup.component';
import { UpdateproductComponent } from './components/seller/updateproduct/updateproduct.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'/roleselection',
        pathMatch:'full'
    },
    {
        path:'roleselection',
        component:RoleselectionComponent
    },
    {
        path:'seller/login',
        component:SLoginComponent
    },
    {
        path:'seller/signup',
        component:SSignupComponent
    },
    {
        path:'customer/login',
        component:CLoginComponent
    },
    {
        path:'customer/signup',
        component:CSignupComponent
    },
    {
        path:'dash',
        component:SellerdashboardComponent
    },
    {
        path:'purchase-history',
        component:PurchasehistoryComponent

    },
    {
        path:'add-product',
        component:AddproductComponent
    },
    {
        path:'customer-dash',
        component:CustomerdashboardComponent
    },
    {
        path:'order-history',
        component:OrderhistoryComponent
    },
    {
        path:'your-cart',
        component:CartComponent
    },
    {
        path:'update-products',
        component:UpdateproductComponent
    }
];
