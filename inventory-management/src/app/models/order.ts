import { FormControl } from "@angular/forms";

export interface Order {

    orderId: FormControl<number|null>;
    customerId: FormControl<number|null>;
    productName: FormControl<string|null>
    quantity: FormControl<number|null>;
    subPrice:FormControl<number|null>;
    orderDate: FormControl<Date|null> 
  }