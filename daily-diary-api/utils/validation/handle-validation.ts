import { StatusCodes } from "../../models/enums/status.enum";
import { ValidatorType } from "../../models/enums/validator-type.enum";
import { CustomError } from "../custom-error";
import { Validation } from "./validation";

export const isRequired = (input: string): boolean => {
    return input ? true : false;
};

export const isValidMaxlength = (
    input: string,
    maximumLength: number
): boolean => {
    if (input && input.length > maximumLength) {
        return false;
    }
    return true;
};

export const isNumeric = (input: string): boolean => {
    if (input) {
        return /^-?\d+$/.test(input);
    }
    return true;
};

export const isValidDate = (input: string): boolean => {
    if (input) {
        return !isNaN(new Date(input).getTime());
    }
    return true;
};

export const validateInputParams = (validations: Validation[]) => {
    if (!validations.length) {
        return;
    }

    const errors: string[] = [];
    validations.forEach((validation: Validation) => {
        for (const validator of validation.validators) {
            if (ValidatorType.REQUIRED === validator.type) {
                if (!isRequired(validator.value)) {
                    errors.push(`Field ${validation.field} is required`);
                    break;
                }
            } else if (ValidatorType.MAXLENGTH === validator.type) {
                const maximumLength =
                    validator.extras && validator.extras.length
                        ? validator.extras[0]
                        : 1000;

                if (!isValidMaxlength(validator.value, maximumLength)) {
                    errors.push(
                        `Field ${validation.field} must be less than ${maximumLength} characters`
                    );
                    break;
                }
            } else if (ValidatorType.NUMERIC === validator.type) {
                if (!isNumeric(validator.value)) {
                    errors.push(`Field ${validation.field} must be number`);
                    break;
                }
            } else if (ValidatorType.DATE === validator.type) {
                if (!isValidDate(validator.value)) {
                    errors.push(
                        `Field ${validation.field} must be date format`
                    );
                    break;
                }
            } else {
                throw new CustomError(
                    StatusCodes.BAD_REQUEST,
                    "There is no validators"
                );
            }
        }
    });

    if (errors.length) {
        const allErrorMsg: string = errors.join("; ");
        throw new CustomError(StatusCodes.BAD_REQUEST, allErrorMsg);
    }
};
