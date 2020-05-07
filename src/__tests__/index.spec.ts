import { main } from '../index'
import * as core from './__mocks__/@actions/core'
import * as twilio from './__mocks__/twilio'

test('should run successfully', async () => {
  const sid = 'test-fax-sid'
  const args = new Map<string, string>([
    ['twilio_account_sid', 'test-sid'],
    ['twilio_auth_token', 'test-token'],
    ['from', 'test-from'],
    ['to', 'test-to'],
    ['url', 'test-url']
  ])
  core.getInput.mockImplementation((k) => args.get(k))

  const createSpy = jest.fn(() => new Promise((r1) => r1({ sid })))
  twilio['default'].mockImplementation(() => ({
    fax: {
      faxes: {
        create: createSpy
      }
    }
  }))
  await main()
  expect(twilio['default']).toHaveBeenCalledWith(
    args.get('twilio_account_sid'),
    args.get('twilio_auth_token'),
    { lazyLoading: true }
  )
  expect(core.getInput).toHaveBeenCalledTimes(5)
  for (const key of args.keys()) {
    expect(core.getInput).toHaveBeenCalledWith(key)
  }
  expect(core.setFailed).not.toHaveBeenCalled()
  expect(core.setOutput).toHaveBeenCalledTimes(1)
  expect(core.setOutput).toHaveBeenCalledWith('sid', sid)
  expect(createSpy).toHaveBeenCalledWith({
    from: args.get('from'),
    to: args.get('to'),
    mediaUrl: args.get('url')
  })
})

test('should print error in case of failure', async () => {
  const message = 'test-message'
  twilio['default'].mockImplementation(() => {
    throw new Error(message)
  })
  await main()
  expect(core.setOutput).not.toHaveBeenCalled()
  expect(core.setFailed).toHaveBeenCalledTimes(1)
  expect(core.setFailed).toHaveBeenCalledWith(message)
})
