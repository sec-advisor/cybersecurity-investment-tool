import { BpfValidationResponse } from '@libs';
import { Injectable } from '@nestjs/common';

import {
  supportedChars,
  supportedParameters,
} from '../constants/supported-chars.constant';

@Injectable()
export class BpfValidatorService {
  validate(bpf: string): BpfValidationResponse {
    const invalidValidator = [
      this.validateParenthesis(bpf),
      this.validateChars(bpf),
      this.validateParameters(bpf),
    ].find((validator) => !validator.isValid);
    return invalidValidator
      ? { isValid: false, error: invalidValidator.error }
      : { isValid: true };
  }

  private validateParenthesis(bpf: string): BpfValidationResponse {
    // https://stackoverflow.com/questions/63009983/javascript-balancing-parentheses
    const brackets = [];
    for (let i = 0; i < bpf.length; i++) {
      if (bpf[i] === '(') {
        brackets.push(bpf[i]);
      } else if (bpf[i] === ')') {
        if (brackets[brackets.length - 1] === '(') brackets.pop();
        else brackets.push('#');
      }
    }
    return brackets.length === 0
      ? { isValid: true }
      : { isValid: false, error: 'Parenthesis not balanced!' };
  }

  private validateChars(bpf: string): BpfValidationResponse {
    const isValid = Array.from(bpf).every((char) => {
      return supportedChars.includes(char);
    });
    return isValid
      ? { isValid }
      : { isValid, error: 'Not allowed character(s) in formula!' };
  }

  private validateParameters(bpf: string): BpfValidationResponse {
    const invalidParams = supportedParameters
      .map((param) => this.validateParameter(bpf, param))
      .find((validation) => !validation.isValid);
    return invalidParams
      ? { isValid: false, error: invalidParams.error }
      : { isValid: true };
  }

  private validateParameter(bpf: string, param: string): BpfValidationResponse {
    const invalidCondition = [
      {
        condition: () => bpf.includes(param),
        error: `Parameter "${param}" is missing!`,
      },
      {
        condition: () => bpf.indexOf(param) === bpf.lastIndexOf(param),
        error: `"Parameter ${param}" is allowed only once!`,
      },
    ].find((item) => !item.condition());
    return invalidCondition
      ? { isValid: false, error: invalidCondition.error }
      : { isValid: true };
  }
}
