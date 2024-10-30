import { FormControl } from "@angular/forms";

export interface Product {
    
    productName: FormControl<string|null>;
    price: FormControl<number|null>;
    quantity: FormControl<number|null>;
  }
  