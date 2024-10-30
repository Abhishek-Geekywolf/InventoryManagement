import { Routes } from '@angular/router';
import { SellerdashboardComponent } from './components/seller/sellerdashboard/sellerdashboard.component';
import { PurchasehistoryComponent } from './components/seller/purchasehistory/purchasehistory.component';
import { AddproductComponent } from './components/seller/addproduct/addproduct.component';

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
    }
];
