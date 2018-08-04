const { User, schema } = require('../user.model')

describe('Testing User Model', () => {
  test('It should have a email', async () => {
    expect(schema.email).toBeDefined()
    expect(typeof schema.email.type).toEqual(String)
    expect(schema.email.required).toEqual(true)
    expect(schema.email.unique).toEqual(true)
  })
  test('It should have a passwordHash', async () => {
    expect(schema.passwordHash).toBeDefined()
    expect(typeof schema.passwordHash).toEqual(String)
    expect(schema.passwordHash.required).toEqual(true)
  })
})
