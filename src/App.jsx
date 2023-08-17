import React, { useState } from 'react'
import PasswordValidator from './lib'

const App = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onValidatorChangeHandler = (result) => {
    // result should be true for valid password or false to invalid password
    // Handle here your password validation status
  }
  return (
    <>
      <div className='w-5/12 mx-auto mt-72'>
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
          maxLength={16}
          password={password}
          confirmedPassword={confirmPassword}
          iconSize={16}
          onValidatorChange={onValidatorChangeHandler}
          config = {{
            // show porgress bar
            showProgressBar: true,
            // Password suggestion
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