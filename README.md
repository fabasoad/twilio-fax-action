# Twilio Fax Action
![](https://img.shields.io/github/v/release/fabasoad/twilio-fax-action?include_prereleases) ![CI (latest)](https://github.com/fabasoad/twilio-fax-action/workflows/CI%20(latest)/badge.svg) ![CI (master)](https://github.com/fabasoad/twilio-fax-action/workflows/CI%20(master)/badge.svg) ![YAML Lint](https://github.com/fabasoad/twilio-fax-action/workflows/YAML%20Lint/badge.svg)

This action sends fax using Twilio.

## Prerequisites
Sign up to [Twilio](https://twilio.com) official web page. Then [register a new number](https://www.twilio.com/console/voice/numbers) to use it as `from` parameter. If you use free trial account you have to [add verified phone number](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio) to use it as `to` parameter. Account SID and Auth token you can find on a [Dashboard page](https://www.twilio.com/console).

## Inputs
| Name               | Required | Description                              | Possible values |
|--------------------|----------|------------------------------------------|-----------------|
| twilio_account_sid | Yes      | Twilio account SID                       | &lt;String&gt;  |
| twilio_auth_token  | Yes      | Twilio auth token                        | &lt;String&gt;  |
| url                | Yes      | Url to the file that will be send by fax | &lt;String&gt;  |
| from               | Yes      | Fax sender number (Twilio)               | &lt;String&gt;  |
| to                 | Yes      | Fax receiver number                      | &lt;String&gt;  |

## Example usage

### Workflow configuration

```yaml
name: Twilio

on: push

jobs:
  twilio-fax:
    name: Twilio Fax
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: fabasoad/twilio-fax-action@master
        if: success()
        with:
          url: 'http://africau.edu/images/default/sample.pdf'
          from: '+1(123)4567890'
          to: '+1(123)4567809'
          twilio_account_sid: ${{ secrets.TWILIO_ACCOUNT_SID }}
          twilio_auth_token: ${{ secrets.TWILIO_AUTH_TOKEN }}
```

### Result
.