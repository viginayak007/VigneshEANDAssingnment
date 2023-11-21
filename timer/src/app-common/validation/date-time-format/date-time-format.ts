import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";
import * as moment from "moment-timezone";
const dotenv = require('dotenv').config().parsed;

export function validate(value: any, expectedFormat: string): boolean {
const isValid  =  moment(value, expectedFormat, true).isValid()
  return isValid;
}
 // Checks if the valid format
export function validDateTimeFormat(inputData: string, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: "VALID_FORMAT",
      constraints: [inputData],
      validator: {
        validate: (value, args): boolean => validate(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => `Invalid Date format`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
