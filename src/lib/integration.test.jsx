import * as React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, test, afterEach } from 'vitest'
import PasswordValidator from './index'
import { spyOn } from 'tinyspy'

describe('Options validator tests', () => {
  afterEach(cleanup)

  test('Should show option minLength', () => {
    render(<PasswordValidator rules={['minLength']} minLength={8} />)
    expect(screen.getByText('Please provide at least 8 characters'))
  })

  test('Should show option that does not allow empty passwords', () => {
    render(<PasswordValidator rules={['notEmpty']} />)
    expect(screen.getByText('Password cannot be empty'))
  })

  test('Should show option that validates lowecase letters', () => {
    render(<PasswordValidator rules={['lowercase']} />)
    expect(screen.getByText('Pelase add at least one lowecase letter'))
  })

  test('Should show option that validates forbidden words in the password field', () => {
    render(<PasswordValidator rules={['shouldNotContain']} forbiddenWords={['John', 'Doe']} password='#$john_32Doe' />)
    expect(screen.getByText('Password contains forbidden words'))
  })

  test('Should show option that validates if password contains at least one number', () => {
    render(<PasswordValidator rules={['number']} />)
    expect(screen.getByText('Please include at least one number'))
  })

  test('Should show option that validate max length in the password field', () => {
    render(<PasswordValidator rules={['maxLength']} maxLength={10} password='12345678910' />)
    expect(screen.getByText('Please provide less than 10 characters'))
  })

  test('Should show option that checks if password contains at least a capital letter', () => {
    render(<PasswordValidator rules={['capital']} />)
    expect(screen.getByText('Passwor sould contain a capital letter'))
  })

  test('Should show option that validates if password contains an special character', () => {
    render(<PasswordValidator rules={['specialChar']} />)
    expect(screen.getByText('Missing special character'))
  })

  test('Should show option that validates if password and confirmed password matches', () => {
    render(<PasswordValidator rules={['matches']} password='12345678' confirmedPassword='12345679' />)
    expect(screen.getByText("Passwords doesn't match"))
  })
})

describe('Functionality of password validators', () => {
  afterEach(cleanup)

  // Min length
  test('Should return false if min length does not match with the minLength property passed', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['minLength']} minLength={8} password='1234567' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if min length matches with the minLength property passed', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['minLength']} minLength={8} password='12345678' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Max Length
  test('Should return false if max length does not match with the maxLength property passed', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['maxLength']} maxLength={8} password='123456789' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if max length matches with the maxLength property passed', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['maxLength']} maxLength={8} password='12345678' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Password empty
  test('Should return false if password is empty', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['notEmpty']} password='' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password is not empty', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['notEmpty']} password='12345678' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Capital letter validation
  test('Should return false if password does not contains at least a capital letter', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['capital']} password='mypassword@123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password contains at least one capital letter', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['capital']} password='myPassword@123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Lowercase letter validation
  test('Should return false if password does not contains at least a lowercase letter', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['lowercase']} password='MYPASSWORD@123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password contains at least one lowercase letter', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['lowercase']} password='MyPASSWORD@123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // special character validation
  test('Should return false if password does not contains at least one special character', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['specialChar']} password='myPassword123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password contains at least one special character', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['specialChar']} password='myPassword@123' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // special character validation
  test('Should return false if password does not contains at least one of the provided forbidden words', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['shouldNotContain']} password='JoHn#45@DoE2255' forbiddenWords={['john', 'doe']} onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password contains at least one of the provided forbidden words', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['shouldNotContain']} password='joh?n#45@Do?e2255' forbiddenWords={['john', 'doe']} onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Passwords match validation
  test('Should return false if password does not match confirmed password', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['matches']} password='JoHn#45@DoE2255' confirmedPassword='JoHn#45@DoE2255_' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password matches confirmed password', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['matches']} password='joh?n#45@Do?e2255' confirmedPassword='joh?n#45@Do?e2255'  onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Passwords match validation
  test('Should return false if password does not match confirmed password', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['matches']} password='JoHn#45@DoE2255' confirmedPassword='JoHn#45@DoE2255_' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password matches confirmed password', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['matches']} password='joh?n#45@Do?e2255' confirmedPassword='joh?n#45@Do?e2255'  onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })

  // Passwords contains numbers validation
  test('Should return false if password does not contains at least one number', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['number']} password='JoHn#@DoE' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(false);
  })
  test('Should return true if password contains at least one number', () => {
    let validatorStatus = true;
    const onValidatorChange = (status) => { validatorStatus = status };
    render(<PasswordValidator rules={['number']} password='john#45@Doe2255' onValidatorChange={onValidatorChange} />)
    expect(validatorStatus).toBe(true);
  })
})

describe('Configuration of custom text tests', () => {
  afterEach(cleanup)
  const myOwnTexts = { 
    minLength: { 
        errorText: 'MLErrorText', 
        successText: 'MLSuccessText' 
    },
    capital: { 
        errorText: 'CErrorText', 
        successText: 'CSuccessText' 
    },
    lowercase: { 
        errorText: 'LCErrorText', 
        successText: 'LCSuccessText' 
    },
    matches: { 
        errorText: 'MErrorText', 
        successText: 'MSuccessText' 
    },
    maxLength: { 
        errorText: 'MaxLErrorText', 
        successText: 'MaxLSuccessText' 
    },
    notEmpty: { 
        errorText: 'NEErrorText', 
        successText: 'NESuccessText' 
    },
    number: { 
        errorText: 'NErrorText', 
        successText: 'NSuccessText' 
    },
    shouldNotContain: { 
        errorText: 'SNCErrorText', 
        successText: 'SNCSuccessText' 
    },
    specialChar: { 
        errorText: 'SCErrorText', 
        successText: 'SCSuccessText' 
    },
}
  // Min length
  test("Should show user's custom minLength error text", () => {
    render(<PasswordValidator rules={['minLength']} config={{ customText: myOwnTexts }} minLength={8} password='1234567' />)
    expect(screen.getByText(myOwnTexts.minLength.errorText))
  })
  test("Should show user's custom minLength success text", () => {
    render(<PasswordValidator rules={['minLength']} config={{ customText: myOwnTexts }} minLength={8} password='12345678' />)
    expect(screen.getByText(myOwnTexts.minLength.successText))
  })

  // Max length
  test("Should show user's custom maxLength error text", () => {
    render(<PasswordValidator rules={['maxLength']} config={{ customText: myOwnTexts }} maxLength={8} password='123456789' />)
    expect(screen.getByText(myOwnTexts.maxLength.errorText))
  })
  test("Should show user's custom notEmpty success text", () => {
    render(<PasswordValidator rules={['maxLength']} config={{ customText: myOwnTexts }} maxLength={8} password='123' />)
    expect(screen.getByText(myOwnTexts.maxLength.successText))
  })

  // Not empty
  test("Should show user's custom notEmpty error text", () => {
    render(<PasswordValidator rules={['notEmpty']} config={{ customText: myOwnTexts }} password='' />)
    expect(screen.getByText(myOwnTexts.notEmpty.errorText))
  })
  test("Should show user's custom notEmpty success text", () => {
    render(<PasswordValidator rules={['notEmpty']} config={{ customText: myOwnTexts }} password='123' />)
    expect(screen.getByText(myOwnTexts.notEmpty.successText))
  })

  // Capital letter
  test("Should show user's custom capital error text", () => {
    render(<PasswordValidator rules={['capital']} config={{ customText: myOwnTexts }} password='abc' />)
    expect(screen.getByText(myOwnTexts.capital.errorText))
  })
  test("Should show user's custom capital success text", () => {
    render(<PasswordValidator rules={['capital']} config={{ customText: myOwnTexts }} password='ABC' />)
    expect(screen.getByText(myOwnTexts.capital.successText))
  })
  
  // Capital letter
  test("Should show user's custom capital error text", () => {
    render(<PasswordValidator rules={['capital']} config={{ customText: myOwnTexts }} password='abc' />)
    expect(screen.getByText(myOwnTexts.capital.errorText))
  })
  test("Should show user's custom capital success text", () => {
    render(<PasswordValidator rules={['capital']} config={{ customText: myOwnTexts }} password='ABC' />)
    expect(screen.getByText(myOwnTexts.capital.successText))
  })

  // lowercase letter
  test("Should show user's custom lowercase error text", () => {
    render(<PasswordValidator rules={['lowercase']} config={{ customText: myOwnTexts }} password='ABC' />)
    expect(screen.getByText(myOwnTexts.lowercase.errorText))
  })
  test("Should show user's custom lowercase success text", () => {
    render(<PasswordValidator rules={['lowercase']} config={{ customText: myOwnTexts }} password='abc' />)
    expect(screen.getByText(myOwnTexts.lowercase.successText))
  })

  // special character
  test("Should show user's custom specialChar error text", () => {
    render(<PasswordValidator rules={['specialChar']} config={{ customText: myOwnTexts }} password='ABC' />)
    expect(screen.getByText(myOwnTexts.specialChar.errorText))
  })
  test("Should show user's custom specialChar success text", () => {
    render(<PasswordValidator rules={['specialChar']} config={{ customText: myOwnTexts }} password='abc@' />)
    expect(screen.getByText(myOwnTexts.specialChar.successText))
  })

  // forbidden words
  test("Should show user's custom shouldNotContain error text", () => {
    render(<PasswordValidator rules={['shouldNotContain']} config={{ customText: myOwnTexts }} password='John@Doe' forbiddenWords={['john', 'doe']} />)
    expect(screen.getByText(myOwnTexts.shouldNotContain.errorText))
  })
  test("Should show user's custom shouldNotContain success text", () => {
    render(<PasswordValidator rules={['shouldNotContain']} config={{ customText: myOwnTexts }} password='abc@abc' forbiddenWords={['john', 'doe']} />)
    expect(screen.getByText(myOwnTexts.shouldNotContain.successText))
  })

  // Passwords match
  test("Should show user's custom matches error text", () => {
    render(<PasswordValidator rules={['matches']} config={{ customText: myOwnTexts }} password='John@Doe' confirmedPassword='John@Doe_' />)
    expect(screen.getByText(myOwnTexts.matches.errorText))
  })
  test("Should show user's custom matches success text", () => {
    render(<PasswordValidator rules={['matches']} config={{ customText: myOwnTexts }} password='abc@abc' confirmedPassword='abc@abc' />)
    expect(screen.getByText(myOwnTexts.matches.successText))
  })

  // Contains number
  test("Should show user's custom number error text", () => {
    render(<PasswordValidator rules={['number']} config={{ customText: myOwnTexts }} password='John@Doe' />)
    expect(screen.getByText(myOwnTexts.number.errorText))
  })
  test("Should show user's custom number success text", () => {
    render(<PasswordValidator rules={['number']} config={{ customText: myOwnTexts }} password='abc@abc1' />)
    expect(screen.getByText(myOwnTexts.number.successText))
  })
})

describe('General configuration tests', () => {
  afterEach(cleanup)

  test("Should render progress bar if showProgressBar attribute is set to true in config", () => {
    render(<PasswordValidator rules={['number']} config={{ showProgressBar: true }} />)
    expect(screen.getAllByLabelText('progress bar'));
  })

  test("Should add custom classes to the different elements", () => {
    let password = '';
    const myClasses = { 
        containerClass: 'containerClass', 
        gridClass: 'gridClass',
        invalidProgressBarClass: 'invalidProgressClass', 
        ruleClass: 'ruleClass', 
        validProgressBarClass: 'validProgressClass' 
    }
    render(<PasswordValidator rules={['number']} password={password} confirmedPassword={password} config={{ showProgressBar: true, classNames: myClasses }} />)

    const progressValid = document.querySelector(`.rpv-progress-bar.${myClasses.validProgressBarClass}`) || undefined;
    const progressInvalid = document.querySelector(`.rpv-progress-bar.${myClasses.invalidProgressBarClass}`) || undefined;

    expect(document.querySelector('.rpv-container').classList.contains(myClasses.containerClass)).toBeTruthy();
    expect(document.querySelector('.rpv-grid').classList.contains(myClasses.gridClass)).toBeTruthy();
    expect(document.querySelector('.rpv-rule').classList.contains(myClasses.ruleClass)).toBeTruthy();
    
    expect(progressValid).toBeDefined();
    expect(progressInvalid).toBeDefined();
  })
})

describe("Throw tests", () => {
    afterEach(cleanup)

    test("Should throw if rules is not an array", () => {
        expect(() => {
            render(<PasswordValidator rules={'number'} config={{ showProgressBar: true }} />)
        }).toThrow();
    });

    test("Should throw if minLength is not a number", () => {
        expect(() => {
            render(<PasswordValidator rules={['minLength']} minLength={'8'} config={{ showProgressBar: true }} />)
        }).toThrow();
    });

    test("Should throw if maxLength is not a number", () => {
        expect(() => {
            render(<PasswordValidator rules={['maxLength']} maxLength={'8'} config={{ showProgressBar: true }} />)
        }).toThrow();
    });

    test("Should throw if forbiddenWords is not an array", () => {
        expect(() => {
            render(<PasswordValidator rules={['shouldNotContain']} forbiddenWords={'8'} />)
        }).toThrow();
    });

    test("Should throw if an unknown rule is passed in the rules array", () => {
        expect(() => {
            render(<PasswordValidator rules={['UnknownRule']} />)
        }).toThrow();
    });
  })