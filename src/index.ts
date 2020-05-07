import * as core from '@actions/core'
import * as twilio from 'twilio'
import { FaxInstance } from 'twilio/lib/rest/fax/v1/fax'

export const main = async () => {
  try {
    const f: FaxInstance = await twilio.default(
      core.getInput('twilio_account_sid'),
      core.getInput('twilio_auth_token'),
      { lazyLoading: true }
    ).fax.faxes.create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      mediaUrl: core.getInput('url')
    })
    core.setOutput('sid', f.sid)
  } catch ({ message }) {
    core.setFailed(message)
  }
}

main()
