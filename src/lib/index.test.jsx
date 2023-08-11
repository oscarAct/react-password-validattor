import React from 'react'
import renderer from 'react-test-renderer'
import { describe, expect, test } from 'vitest'
import PasswordisValidator from './index'

describe('Password validator', () => {
  test('Password validator component renders correctly', () => {
    const component = renderer.create(
      <PasswordisValidator />
    )
    expect(component).toBeDefined();
  })
})
