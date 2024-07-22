/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phone: string) {
    return phone?.startsWith('+372') && phone.length === 12; // +372 + 6 digits
  }

  defaultMessage() {
    return 'Phone number must start with +372 and be exactly 12 characters long.';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPhoneNumberConstraint,
    });
  };
}
