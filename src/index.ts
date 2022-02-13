import * as core from '@actions/core'

core.setOutput('sid', 'None')
core.warning(
  'This GitHub action is deprecated, is not supported and cannot be used. ' +
  'Twilio sunset programmable fax offering on 2021/12/17. And also, ' +
  'twilio-node library introduced the breaking change in 3.74.0 version ' +
  'where possibility to send faxes has been removed. More ' +
  ' information here: [1] https://github.com/twilio/twilio-node/releases/tag/3.74.0' +
  ' and [2] https://www.twilio.com/changelog/programmable-fax-end-life-one-year-notice'
)
