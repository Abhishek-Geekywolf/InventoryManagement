import { FormControl } from "@angular/forms";

export interface Product {
    
    sellerid:FormControl<number|null>
    productName: FormControl<string|null>;
    price: FormControl<number|null>;
    quantity: FormControl<number|null>;
  }
  