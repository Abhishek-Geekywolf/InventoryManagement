import { FormControl } from "@angular/forms";

export interface updateProduct {
    newPrice: FormControl<number|null>;
    addQuantity: FormControl<number|null>;
}
  