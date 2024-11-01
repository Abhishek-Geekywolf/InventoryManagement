import { FormControl } from "@angular/forms";

export interface sellerlogin
{
    name:FormControl<string|null>;
    email:FormControl<string|null>;
    contactNumber:FormControl<number|null>;
}