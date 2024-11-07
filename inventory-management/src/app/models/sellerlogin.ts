import { FormControl } from "@angular/forms";

export interface sellerlogin
{
    name:FormControl<string|null>;
    email:FormControl<string|null>;
    phoneNumber:FormControl<number|null>;
    password:FormControl<string|null>;
}