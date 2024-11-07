import { FormControl } from "@angular/forms";

export interface ProductList {
    
    productName: FormControl<string|null>;
    price:FormControl<number|null>;
    quantity: FormControl<number|null>;
  }
  