import React from 'react'
import { REGEXP as regexp, ShowMessage, checkForbiddenWords, ShowIcon, updatePercentage } from './uttils/utilities';


export default function PasswordisValidator({
    rules = ['minLength', 'maxLength', 'notEmpty', 'capital', 'lowercase', 'specialChar'],
    minLength = 0,
    maxLength = 0,
    password = '',
    confirmedPassword = '',
    forbiddenWords = ['', 0],
    onValidatorChange = () => { },
    iconSize = 0,
    config = {
        minLength: {
            successText: '',
            errorText: ''
        },
        maxLength: {
            successText: '',
            errorText: ''
        },
        specialChar: {
            successText: '',
            errorText: ''
        },
        number: {
            successText: '',
            errorText: ''
        },
        capital: {
            successText: '',
            errorText: ''
        },
        matches: {
            successText: '',
            errorText: ''
        },
        lowercase: {
            successText: '',
            errorText: ''
        },
        notEmpty: {
            successText: '',
            errorText: ''
        },
        shouldNotContain: {
            successText: '',
            errorText: ''
        },
        showProgressBar: false,
        classNames: {
            containerClass: '',
            gridClass: '',
            ruleClass: '',
            validProgressBarClass: '',
            invalidProgressBarClass: ''
        }
    }
}) {

    iconSize = iconSize || 16;

    let cont = 0;
    let percentage = 0;

    const dictionary = {
        minLength: {
            successText: config?.minLength?.successText || `Min length ${minLength} characters`,
            errorText: config?.minLength?.errorText || `Please provide at least ${minLength}`,
            isValid: false
        },
        maxLength: {
            successText: config?.maxLength?.successText || `Max length ${maxLength} characters`,
            errorText: config?.maxLength?.errorText || `Please provide less than ${maxLength} characters`,
            isValid: false
        },
        specialChar: {
            successText: config?.specialChar?.successText || `Special character`,
            errorText: config?.specialChar?.errorText || `Missing special character`,
            isValid: false
        },
        number: {
            successText: config?.number?.successText || `Password contains numbers`,
            errorText: config?.number?.errorText || `Please include at least one number`,
            isValid: false
        },
        capital: {
            successText: config?.capital?.successText || `Contains capital letter`,
            errorText: config?.capital?.errorText || `Passwor sould contain a capital letter`,
            isValid: false
        },
        matches: {
            successText: config?.matches?.successText || `Passwords match`,
            errorText: config?.matches?.errorText || `Passwords doesn't match`,
            isValid: false
        },
        lowercase: {
            successText: config?.lowercase?.successText || `Contains lowercase letter`,
            errorText: config?.lowercase?.errorText || `Pelase add at least one lowecase letter`,
            isValid: false
        },
        notEmpty: {
            successText: config?.notEmpty?.successText || `Password is not empty`,
            errorText: config?.notEmpty?.errorText || `Password cannot be empty`,
            isValid: false
        },
        shouldNotContain: {
            successText: config?.shouldNotContain?.successText || `Not contains forbidden words`,
            errorText: config?.shouldNotContain?.errorText || `Password contains forbidden words`,
            isValid: true
        },
    }
    const validate = () => {
        if (!Array.isArray(rules))
            throw new Error(`Value 'rules' expect to be an Array, but we got ${typeof rules}`);

        rules.forEach(rule => {
            switch (rule) {
                case 'minLength':
                    if (typeof minLength !== "number")
                        throw new Error(`Value 'minLength' expect to be a number, but we got ${typeof minLength}`);

                    dictionary[rule].isValid = password.length < minLength ? false : true;
                    break;
                case 'maxLength':
                    if (typeof minLength !== "number")
                        throw new Error(`Value 'maxLength' expect to be a number, but we got ${typeof minLength}`);

                    dictionary[rule].isValid = password.length > maxLength ? false : true;
                    break;
                case 'notEmpty':
                    dictionary[rule].isValid = password.length == 0 ? false : true;
                    break;
                case 'capital':
                    dictionary[rule].isValid = regexp.containsUppercase.test(password) == 0 ? false : true;
                    break;
                case 'number':
                    dictionary[rule].isValid = regexp.containsNumber.test(password) == 0 ? false : true;
                    break;
                case 'lowercase':
                    dictionary[rule].isValid = regexp.containsLowercase.test(password) == 0 ? false : true;
                    break;
                case 'specialChar':
                    dictionary[rule].isValid = regexp.containsSpecialChar.test(password) == 0 ? false : true;
                    break;
                case 'matches':
                    dictionary[rule].isValid = password == confirmedPassword ? true : false;
                    break;
                case 'shouldNotContain':
                    if (typeof forbiddenWords !== "object")
                        throw new Error(`Value 'forbiddenWords' expect to be an object (array of strings), but we got ${typeof minLength}`);

                    if (checkForbiddenWords(password, forbiddenWords)) {
                        dictionary[rule].isValid = false;
                    } else {
                        dictionary[rule].isValid = true;
                    }
                    break;
                default:
                    break;
            }
        });
        rules.forEach(rule => {
            if (dictionary[rule].isValid == true) {
                cont++;
            }
        });
        cont == rules.length ? onValidatorChange(true) : onValidatorChange(false);
    }
    validate();
    percentage = updatePercentage(cont, rules);
    return (
        <>
            <div className={`rpv-container ${config?.classNames?.containerClass}`}>
                <div className={`rpv-grid ${config?.classNames?.gridClass}`}>
                    {
                        rules.map(rule => {
                            return (
                                <div className={`rpv-rule ${config?.classNames?.ruleClass}`} key={rule}>
                                    <ShowIcon rule={rule} dictionary={dictionary} iconSize={iconSize} />
                                    <span className=''>
                                        <ShowMessage rule={rule} dictionary={dictionary} />
                                    </span>
                                </div>
                            )
                        })
                    }
                    <div style={{ display: config?.showProgressBar ? "block" : "none", width: `${percentage}%`, opacity: percentage < 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)" }} className={`rpv-progress-bar ${config?.classNames?.invalidProgressBarClass}`}></div>
                    <div style={{ display: config?.showProgressBar ? "block" : "none", width: `${percentage}%`, opacity: percentage == 100 ? "1" : "0", backgroundImage: "linear-gradient(to right, #0ba360 0%, #3cba92 100%)" }} className={`rpv-progress-bar ${config?.classNames?.validProgressBarClass}`}></div>
                </div>
            </div>
        </>
    )
}
