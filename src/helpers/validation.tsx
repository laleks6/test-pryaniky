import { Data } from '../types';

function isValidation(reg: RegExp, data: string): boolean {
  const validation = reg.test(data);

  return validation;
}

function isValidationEditForm(data: Data): boolean | Record<string, boolean> {
  let count = true;
  const copyData = JSON.parse(JSON.stringify(data));
  console.log(copyData);
  for (let key in copyData) {
    console.log(key);
    if (copyData[key].length > 0 && copyData[key] !== 'Invalid Date') {
      console.log('false is  valif', copyData[key]);
      copyData[key] = true;
    } else {
      console.log('true is not valif', copyData[key]);
      count = false;
      copyData[key] = false;
    }
  }
  console.log(!count ? copyData : true);
  return !count ? copyData : true;
}

export { isValidation, isValidationEditForm };
