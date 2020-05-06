import * as core from '@actions/core'
import * as twilio from 'twilio'

export const main = async () => {
  try {
    await twilio.default(
      core.getInput('twilio_account_sid'),
      core.getInput('twilio_auth_token'),
      { lazyLoading: true }
    ).fax.faxes.create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      mediaUrl: core.getInput('url')
    })
  } catch ({ message }) {
    core.setFailed(message)
  }
}

main()