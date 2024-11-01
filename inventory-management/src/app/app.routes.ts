import { Routes } from '@angular/router';
import { SellerdashboardComponent } from './components/seller/sellerdashboard/sellerdashboard.component';
import { PurchasehistoryComponent } from './components/seller/purchasehistory/purchasehistory.component';
import { AddproductComponent } from './components/seller/addproduct/addproduct.component';
import { CustomerdashboardComponent } from './components/customer/customerdashboard/customerdashboard.component';
import { OrderhistoryComponent } from './components/customer/orderhistory/orderhistory.component';
import { CartComponent } from './components/customer/cart/cart.component';

export const routes: Routes = [
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
    }
];
