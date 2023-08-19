
# React Password Validator

This react component lets the user validate their password fields quick and easily.


## Demo

![Password Validattor Demo](https://firebasestorage.googleapis.com/v0/b/gestor-de-archivos-34c41.appspot.com/o/react-components%2Fpassword%20validattor%20test.gif?alt=media&token=2e0c84f4-3180-47de-8dd2-4b6089fe3cf0)

[Click here for full documentation and more examples](https://rpv.oscarmoralesd.com/)


## Features

- Fully customizable
- Good look and feel
- Light weight
- Responsive
- Well tested


## Installation

Install react-password-validattor with npm. In your react project run:

```bash
  npm install react-password-validator
```

_Please note that react is a peer dependency of this package._
## Basic usage example

In your `App.css` import the styles

```css
@import url('../node_modules/react-password-validattor/dist/style.css');
```

Then, your component should look like this

``` javascript
import React, { useState } from 'react'
import PasswordValidattor from 'react-password-validattor';

const App = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onValidatorChangeHandler = (result) => {
    // result should be true for valid password or false to invalid password
    // Handle here your password validation status
  }
  return (
    <>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder="Enter your password" />
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmedPassword" placeholder="Please re-enter your password" />
        <PasswordValidator 
          rules={['minLength', 
                  'maxLength', 
                  'specialChar', 
                  'number', 
                  'capital', 
                  'matches', 
                  'lowercase', 
                  'notEmpty', 
                  'shouldNotContain']}
          forbiddenWords={['John', 'Doe']} 
          minLength={8}
          maxLength={32}
          password={password}
          confirmedPassword={confirmPassword}
          iconSize={16}
          onValidatorChange={onValidatorChangeHandler}
          config={{ showProgressBar: true, showPasswordSuggestion: true }} />
      </div>
    </>
  )
}

export default App
```
# Available rules

## minLength
Verify if the provided password met the min length property
## maxLength
Verify if the provided password met the max length property
## specialChar
Verify if the password contains at least one special character
## number
Verify if the password contains at least one number
## capital
Verify if the password contains at least one capital letter
## matches
Verify if the password matches with confirmedPassword value
## lowercase
Verify if the password contains at least one lowercase letter
## notEmpty
Verify if the password is not empty
## shouldNotContains
Verify if the password contains forbidden words such as user's name, lastname, etc...

# Props

| Prop | Description | Type | Required | Default 
| :-------- | :------- | :------ |  :------- | :------- |
| rules | Rules that can be passed to check password strength. The rules that can be passed are `minLength`, `maxLength`, `specialChar`, `number`, `capital`, `matches`, `lowercase`, `notEmpty`, `shouldNotContains` | <String>Array | true |
minLength | Min length allowed for the password | number | false | 8 |
maxLength | Max length allowed for the password | number | false | 32 | 
iconSize | Size of the icons | number  |  false | 16
password | Password typed for the user | string | true | |
confirmedPassword | Password re-entered for the user. Required if `matches` option is passed into the rules array | string | |
config  | Configuration object | object | false | |
onValidatorChange | Function that will recieve the RPV status | function | true |

# Example of complete configuration

In your `App.css` import the styles

```css
@import url('../node_modules/react-password-validattor/dist/style.css');
```

Then in your component should look like this:

```javascript
import React, { useState } from 'react'
import PasswordValidattor from 'react-password-validattor';

const App = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onValidatorChangeHandler = (result) => {
    // result should be true for valid password or false to invalid password
    // Handle here your password validation status
  }
  return (
    <>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder="Enter your password" />
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmedPassword" placeholder="Please re-enter your password" />
        <PasswordValidator 
          rules={['minLength', 
                  'maxLength', 
                  'specialChar', 
                  'number', 
                  'capital', 
                  'matches', 
                  'lowercase', 
                  'notEmpty', 
                  'shouldNotContain']}
          forbiddenWords={['John', 'Doe']} 
          minLength={8}
          maxLength={32}
          password={password}
          confirmedPassword={confirmPassword}
          iconSize={16}
          onValidatorChange={onValidatorChangeHandler}
          config = {{
            // Custom message texts / Internationalization
            customText: {
                minLength: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                maxLength: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                specialChar: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                number: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                capital: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                matches: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                lowercase: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                notEmpty: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
                shouldNotContain: {
                    successText: 'My custom text',
                    errorText: 'My custom text'
                },
            },
            // Show porgress bar
            showProgressBar: false,
            // Show password suggestions
            showPasswordSuggestion: true,
            // Custom classes
            classNames: {
                containerClass: 'my-container-custom-class',
                gridClass: 'my-grid-custom-class',
                ruleClass: 'my-rule-custom-class',
                validProgressBarClass: 'my-valid-progress-bar-custom-class',
                invalidProgressBarClass: 'my-invalid-progress-bar-custom-class'
            }
        }} />
      </div>
    </>
  )
}

export default App
```

# Contributing
Contributions are always welcome!
PRs should be well tested and contains all the integration tests. Coverage should be always 100%.
See `contributing.md` for ways to get started.
Please be kind and respectful.

# Run locally

`npm install`
`npm run dev`

# To run tests

`npm run watch` or `npm run test`

