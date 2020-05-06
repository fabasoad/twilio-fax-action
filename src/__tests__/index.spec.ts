import { main } from '../index'
import * as core from './__mocks__/@actions/core'
import * as twilio from './__mocks__/twilio'

test('should run successfully', () => {
  const args = new Map<string, string>([
    ['twilio_account_sid', 'test-sid'],
    ['twilio_auth_token', 'test-token'],
    ['from', 'test-from'],
    ['to', 'test-to'],
    ['url', 'test-url']
  ])
  core.getInput.mockImplementation(k => args.get(k))
  
  const createSpy = jest.fn(() => new Promise((r1, r2) => r1()))
  twilio.default.mockImplementation((s, t) => ({
    fax: {
      faxes: {
        create: createSpy
      }
    }
  }))
  main()
  expect(twilio.default).toHaveBeenCalledWith(
    args.get('twilio_account_sid'),
    args.get('twilio_auth_token'),
    { lazyLoading: true }
  )
  expect(core.getInput).toHaveBeenCalledTimes(5)
  for (let key of args.keys()) {
    expect(core.getInput).toHaveBeenCalledWith(key)
  }
  expect(createSpy).toHaveBeenCalledWith({
    from: args.get('from'),
    to: args.get('to'),
    mediaUrl: args.get('url')
  })
})