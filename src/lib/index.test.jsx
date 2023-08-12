import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test } from 'vitest'
import PasswordValidator from './index'

describe('Password validator', () => {
  test('Password validator component renders correctly', () => {
    const component = renderer.create(
      <PasswordValidator rules={['minLength']} config={{ showProgressBar: true }} />
    )
    expect(component).toBeDefined();
  })
})
