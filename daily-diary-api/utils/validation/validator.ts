import { ValidatorType } from "../../models/enums/validator-type.enum";

export interface Validator {
    type: ValidatorType;
    value: string;
    extras?: number[];
}
