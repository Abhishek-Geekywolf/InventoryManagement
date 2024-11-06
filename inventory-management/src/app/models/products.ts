import { FormControl } from "@angular/forms";

export interface Product {
    id:FormControl<number|null>;
    sellerid:FormControl<number|null>;
    productName: FormControl<string|null>;
    quantity: FormControl<number|null>;
    price: FormControl<number|null>;
  }
  