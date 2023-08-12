import React, { useState } from 'react'
import PasswordValidator from './lib'

const App = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onValidatorChangeHandler = (result) => {
    console.log(result);
  }
  return (
    <>
    <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} name="price" id="price" className="block mb-11 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
    <input type="text" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
    <PasswordValidator rules={['shouldNotContain']} forbiddenWords={'8'} config={{ showProgressBar: true }} />
    </>
  )
}

export default App