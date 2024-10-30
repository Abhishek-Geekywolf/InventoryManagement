import { FormControl } from "@angular/forms";

export interface Order {

    orderId: FormControl<number|null>;
    productName: FormControl<string|null>
    customerId: FormControl<number|null>;
    quantity: FormControl<number|null>;
    subPrice:FormControl<number|null>;
    date: FormControl<Date|null> 
  }