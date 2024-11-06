import { FormControl } from "@angular/forms";

export interface Product {
    sellerProductId?:FormControl<number|null>;
    
    sellerid:FormControl<number|null>
    productName: FormControl<string|null>;
    totalQuantity: FormControl<number|null>;
    availableQuantity: FormControl<number|null>;

    price: FormControl<number|null>;
    newPrice: FormControl<number|null>;
    addQuantity: FormControl<number|null>;

    id:FormControl<number|null>;
   
  }

  