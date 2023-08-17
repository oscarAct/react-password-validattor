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
                <div aria-label='progress bar' style={{ width: `${percentage}%`, opacity: percentage < 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)" }} className={`rpv-progress-bar invalid ${config?.classNames?.invalidProgressBarClass ? config?.classNames?.invalidProgressBarClass : ''}`}></div>
                <div aria-label='progress bar' style={{ width: `${percentage}%`, opacity: percentage == 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #0ba360 0%, #3cba92 100%)" }} className={`rpv-progress-bar valid ${config?.classNames?.validProgressBarClass ? config?.classNames?.validProgressBarClass : ''}`}></div>
            </>
        )
    }
}
export function ShowIcon({rule, dictionary, iconSize}) {
    if(dictionary[rule]) {
        if(dictionary[rule].isValid) {
            return (
                <div style={{ minWidth: iconSize + 'px' }}>
                    <CheckIcon iconSize={iconSize} color={'#10b981'} classNames='rpv-default-icon' />
                </div>
            )
        }else {
            return (
                <div style={{ minWidth: iconSize + 'px' }}>
                    <ErrorIcon iconSize={iconSize} color={'#f43f5e'} classNames='rpv-default-icon' />
                </div>
            )
        }
    }
}
export function updatePercentage(cont = 0, rules = []) {
    return (cont * 100) / rules?.length;
}
export function setUpperCase(isUpperCase) {
    if (isUpperCase) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    return '';
}
export function setLowerCase(isLowerCase) {
    if (isLowerCase) {
        return 'abcdefghijklmnopqrstuvwxyz';
    }
    return '';
}
export function setSymbols(isSymbol) {
    if (isSymbol) {
        return '!@#$%^&*()<>,.?/[]{}-=_+|/';
    }
    return '';
}
export function setNumber(isNumeric) {
    if (isNumeric) {
        return '0123456789012345678901234567890';
    }
    return '';
}
export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function passwordCharacters(characters, passwordLength) {
    let password = '';
    if (characters.length) {
        for (let i = 0; i < passwordLength; i++) {
            password += characters[getRandomInteger(0, characters.length - 1)];
        }
        characters = '';
        passwordLength = 0;
        return password;
    }
}
export function generatePassword(passwordProps, characters, passwordLength) {
    const { uppercase, lowercase, symbols, numbers } = passwordProps;

    characters += setUpperCase(uppercase);
    characters += setLowerCase(lowercase);
    characters += setSymbols(symbols);
    characters += setNumber(numbers);

    const password = passwordCharacters(characters, passwordLength);
    return password;
}
export function validateRules(rules = ['']) {

    const passwordGenerationRules = {};

    passwordGenerationRules.lowercase = rules.includes('lowercase') ? true : false;
    passwordGenerationRules.uppercase = rules.includes('capital') ? true : false;
    passwordGenerationRules.symbols = rules.includes('specialChar') ? true : false;
    passwordGenerationRules.numbers = rules.includes('number') ? true : false;

    return passwordGenerationRules;
}