import { CheckIcon } from "../components/CheckIcon";
import { ErrorIcon } from "../components/WrongIcon";
import React from "react";

export const REGEXP = {
    containsNumber : /\d/,
    containsSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    containsLowercase: /[a-z]/,
    containsUppercase: /[A-Z]/
}
export function ShowMessage({rule, dictionary}) {
    if(dictionary[rule]) {
        if(dictionary[rule].isValid) {
            return (
                <span className='ml-2' aria-label={`${dictionary[rule]['successText']}`}>
                    {dictionary[rule]['successText']}
                </span>
            )
        }else {
            return (
                <span className='ml-2' aria-label={`${dictionary[rule]['errorText']}`}>
                    {dictionary[rule]['errorText']}
                </span>
            )
        }
    }
  }
export function checkForbiddenWords(password, forbiddenWords) {
  const passwordLowercase = password.toLowerCase();
  return forbiddenWords.some(word => passwordLowercase.includes(word.toString().toLowerCase()));
}
export function ShowProgressBar({config, percentage}) {
    if(config.showProgressBar){
        return (
            <>
                <div aria-label='progress bar' style={{ width: `${percentage}%`, opacity: percentage < 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)" }} className={`rpv-progress-bar ${config?.classNames?.invalidProgressBarClass ? config?.classNames?.invalidProgressBarClass : ''}`}></div>
                <div aria-label='progress bar' style={{ width: `${percentage}%`, opacity: percentage == 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #0ba360 0%, #3cba92 100%)" }} className={`rpv-progress-bar ${config?.classNames?.validProgressBarClass ? config?.classNames?.validProgressBarClass : ''}`}></div>
            </>
        )
    }
}
export function ShowIcon({rule, dictionary, iconSize}) {
    if(dictionary[rule]) {
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
}
export function updatePercentage(cont = 0, rules = []) {
    return (cont * 100) / rules?.length;
}