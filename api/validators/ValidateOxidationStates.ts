interface validateOxidationStatesReturn {
  errors: Array<string>;
  isValid: boolean;
};

export default function validateOxidationStates(value: any): validateOxidationStatesReturn {
  const errors: Array<string> = [];

  if (!value) {
    errors.push("Value does not exists.");
    return { errors, isValid: errors ? false : true };
  }

  if (!Array.isArray(value)) {
    errors.push("Value is not Array type.");
    return { errors, isValid: errors ? false : true };
  }

  let index: number = 0;
  for (let state of value) {
    if (typeof state !== "number") {
      errors.push(`The value: ${state} in the index: ${index} is not a number type. Must be a Number like: [-1, 2].`);
    };
    index++;
  }

  return { errors, isValid: errors ? false : true };
}
