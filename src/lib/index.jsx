import React, { useState } from 'react';
import './index.css';
import { REGEXP as regexp, 
         ShowMessage, 
         checkForbiddenWords, 
         ShowIcon, 
         updatePercentage, 
         ShowProgressBar,
         generatePassword, 
         validateRules} from './utils/utilities';

import { CopyIcon } from './components/CopyIcon';
import { RefreshIcon } from './components/RefreshIcon';
import { DoubleCheckIcon } from './components/DoubleCheckIcon';


export default function PasswordValidattor({
    rules = ['minLength', 'maxLength', 'notEmpty', 'capital', 'lowercase', 'specialChar'],
    minLength = 8,
    maxLength = 32,
    password = '',
    confirmedPassword = '',
    forbiddenWords = ['', 0],
    onValidatorChange = () => { },
    iconSize = 0,
    config = {
        customText: {
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
        },
        showProgressBar: false,
        showPasswordSuggestion: false,
        classNames: {
            containerClass: '',
            gridClass: '',
            ruleClass: '',
            validProgressBarClass: '',
            invalidProgressBarClass: ''
        }
    }
}) {

    // Password generation rules
    const passGenRules = validateRules(rules);
    const generateNewPassword = () => {
        let characters = '';
        return generatePassword(passGenRules, characters, maxLength - 1);
    }
    const [suggestedPassword, setSuggestedPassword] = useState(generateNewPassword());
    const [copied, setCopied] = useState(false);
    iconSize = iconSize || 16;

    let cont = 0;
    let percentage = 0;

    const dictionary = {
        minLength: {
            successText: config?.customText?.minLength?.successText || `Min length ${minLength} characters`,
            errorText: config?.customText?.minLength?.errorText || `Please provide at least ${minLength} characters`,
            isValid: false
        },
        maxLength: {
            successText: config?.customText?.maxLength?.successText || `Max length ${maxLength} characters`,
            errorText: config?.customText?.maxLength?.errorText || `Please provide less than ${maxLength} characters`,
            isValid: false
        },
        specialChar: {
            successText: config?.customText?.specialChar?.successText || `Special character`,
            errorText: config?.customText?.specialChar?.errorText || `Missing special character`,
            isValid: false
        },
        number: {
            successText: config?.customText?.number?.successText || `Password contains numbers`,
            errorText: config?.customText?.number?.errorText || `Please include at least one number`,
            isValid: false
        },
        capital: {
            successText: config?.customText?.capital?.successText || `Contains capital letter`,
            errorText: config?.customText?.capital?.errorText || `Passwor sould contain a capital letter`,
            isValid: false
        },
        matches: {
            successText: config?.customText?.matches?.successText || `Passwords match`,
            errorText: config?.customText?.matches?.errorText || `Passwords doesn't match`,
            isValid: false
        },
        lowercase: {
            successText: config?.customText?.lowercase?.successText || `Contains lowercase letter`,
            errorText: config?.customText?.lowercase?.errorText || `Pelase add at least one lowecase letter`,
            isValid: false
        },
        notEmpty: {
            successText: config?.customText?.notEmpty?.successText || `Password is not empty`,
            errorText: config?.customText?.notEmpty?.errorText || `Password cannot be empty`,
            isValid: false
        },
        shouldNotContain: {
            successText: config?.customText?.shouldNotContain?.successText || `Not contains forbidden words`,
            errorText: config?.customText?.shouldNotContain?.errorText || `Password contains forbidden words`,
            isValid: true
        },
    }
    const validateStrcture = () => {
        if (Array.isArray(rules) == false)
            throw new Error(`Value 'rules' expect to be an Array, but we got ${typeof rules}`);

        rules.forEach(rule => {
            switch (rule) {
                case 'minLength':
                    if (typeof minLength !== "number")
                        throw new Error(`Value 'minLength' expect to be a number, but we got ${typeof minLength}`);

                    dictionary[rule].isValid = password.length < minLength ? false : true;
                    break;
                case 'maxLength':
                    if (typeof maxLength !== "number")
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
                    if (Array.isArray(forbiddenWords) == false){
                        throw new Error(`Value 'forbiddenWords' expect to be an array, but we got ${typeof forbiddenWords}`);
                    }
                    else {
                        if (checkForbiddenWords(password, forbiddenWords)) {
                            dictionary[rule].isValid = false;
                        } else {
                            dictionary[rule].isValid = true;
                        }
                    }
                    break;
                default:
                    throw new Error(`Unknown rule ${rule}`);
            }
        });
        rules.forEach(rule => {
            if (dictionary[rule]?.isValid == true) {
                cont++;
            }
        });
        cont == rules.length ? onValidatorChange(true) : onValidatorChange(false);
    }
    const ShowPasswordSuggestion = () => {
        if(config.showPasswordSuggestion) {
            return (
                <div className="rpv-suggested-password" aria-label='Password suggestion'>
                    <span aria-label='Suggested password'>{ suggestedPassword }</span>
                    <span className='rpv-copy-password copy-icon' aria-label='Copy suggested password' onClick={() => { copyPassword() }}>
                        <CopyIcon iconSize={16} color={'#d1d5db'} styles={{ display: copied == true ? 'none' : 'block' }} />
                    </span>
                    <span className='rpv-copied-to-clipboard copied-icon' aria-label='Password copied to clipboard'>
                        <DoubleCheckIcon iconSize={16} classNames={'rpv-default-icon copied-to-clipboard'} color={'#10b981'} styles={{ display: copied == true ? 'block' : 'none' }} />
                    </span>
                    <span className='rpv-generate-new refresh-icon' aria-label='Generate new password suggestion' onClick={() => { setSuggestedPassword(generateNewPassword()) }}>
                        <RefreshIcon iconSize={16} color={'#d1d5db'} />
                    </span>
                </div>
            )
        }
    }
    const copyPassword = async () => {
        await navigator.clipboard.writeText(suggestedPassword);
        switchCopiedState(true);
        setTimeout(() => {
            switchCopiedState(false);
        }, 2000);
    }
    function switchCopiedState(value) {
        setCopied(value)
    }
    validateStrcture();
    percentage = updatePercentage(cont, rules);
    return (
        <>
            <div id='rpv' aria-label='Password validation grid container' className={`rpv-container ${config?.classNames?.containerClass ? config?.classNames?.containerClass : ''}`}>
                <ShowPasswordSuggestion />
                <div aria-label='Grid containig password validations' className={`rpv-grid ${config?.classNames?.gridClass ? config?.classNames?.gridClass : ''}`}>
                    {
                        rules.map(rule => {
                            return (
                                <div aria-label='Password rule' className={`rpv-rule ${config?.classNames?.ruleClass ? config?.classNames?.ruleClass : ''}`} key={rule}>
                                    <ShowIcon rule={rule} dictionary={dictionary} iconSize={iconSize} />
                                    <span aria-label={`Rule description`} className=''>
                                        <ShowMessage rule={rule} dictionary={dictionary} />
                                    </span>
                                </div>
                            )
                        })
                    }
                    <ShowProgressBar config={config} percentage={percentage} />
                </div>
            </div>
        </>
    )
}
