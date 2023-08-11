import { CheckIcon } from "../components/CheckIcon";
import { ErrorIcon } from "../components/WrongIcon";

export const REGEXP = {
    containsNumber : /\d/,
    containsSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    containsLowercase: /[a-z]/,
    containsUppercase: /[A-Z]/
}
export function ShowMessage({rule, dictionary}) {
    if(dictionary[rule].isValid) {
        return (
            <span className='ml-2'>
                {dictionary[rule]['successText']}
            </span>
        )
    }else {
        return (
            <span className='ml-2'>
                {dictionary[rule]['errorText']}
            </span>
        )
    }
  }
  export function checkForbiddenWords(password, forbiddenWords) {
    const passwordLowercase = password.toLowerCase();
    return forbiddenWords.some(word => passwordLowercase.includes(word.toString().toLowerCase()));
  }
  export function ShowIcon({rule, dictionary, iconSize}) {
    if(dictionary[rule].isValid) {
        return (
            <div className={`min-w-[${iconSize}]`}>
                <CheckIcon size={iconSize} color={'#10b981'} />
            </div>
        )
    }else {
        return (
            <div className={`min-w-[${iconSize}]`}>
                <ErrorIcon size={iconSize} color={'#f43f5e'} />
            </div>
        )
    }
  }
  export function updatePercentage(cont = 0, rules = []) {
    return (cont * 100) / rules?.length;
  }