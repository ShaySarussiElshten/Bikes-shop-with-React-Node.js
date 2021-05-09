import { useState } from 'react';
import {validate} from '../utils/validators'

const useInput = (validators) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const {isValid:valueIsValid,messageArray:errorMessage} = validate(enteredValue,validators);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    setValue: setEnteredValue,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
