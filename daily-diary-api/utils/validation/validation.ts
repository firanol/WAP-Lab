import { Validator } from "./validator";

export interface Validation {
    field: string;
    validators: Validator[];
}
