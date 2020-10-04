# Twilio Fax Action
![](https://img.shields.io/github/v/release/fabasoad/twilio-fax-action?include_prereleases) ![CI (latest)](https://github.com/fabasoad/twilio-fax-action/workflows/CI%20(latest)/badge.svg) ![CI (main)](https://github.com/fabasoad/twilio-fax-action/workflows/CI%20(main)/badge.svg) ![YAML Lint](https://github.com/fabasoad/twilio-fax-action/workflows/YAML%20Lint/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/92c0b2f32ff15a3522bc/maintainability)](https://codeclimate.com/github/fabasoad/twilio-fax-action/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/92c0b2f32ff15a3522bc/test_coverage)](https://codeclimate.com/github/fabasoad/twilio-fax-action/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/twilio-fax-action/badge.svg)](https://snyk.io/test/github/fabasoad/twilio-fax-action)

This action sends fax using Twilio.

## Prerequisites
Sign up to [Twilio](https://twilio.com) official web page. Then [register a new number](https://www.twilio.com/console/voice/numbers) to use it as `from` parameter. If you use free trial account you have to [add verified phone number](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio) to use it as `to` parameter. Account SID and Auth token you can find on a [Dashboard page](https://www.twilio.com/console).

## Inputs
| Name               | Required | Description                              | Type            |
|--------------------|----------|------------------------------------------|-----------------|
| twilio_account_sid | Yes      | Twilio account SID                       | &lt;String&gt;  |
| twilio_auth_token  | Yes      | Twilio auth token                        | &lt;String&gt;  |
| url                | Yes      | Url to the file that will be send by fax | &lt;String&gt;  |
| from               | Yes      | Fax sender number (Twilio)               | &lt;String&gt;  |
| to                 | Yes      | Fax recepient number                     | &lt;String&gt;  |

## Outputs
| Name | Description                                                                                                            | Type            |
|------|------------------------------------------------------------------------------------------------------------------------|-----------------|
| sid  | SID of fax operation. You can use it then by calling [Fax REST API](https://www.twilio.com/docs/fax/api/fax-resource). | &lt;String&gt;  |

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
      - uses: fabasoad/twilio-fax-action@main
        with:
          url: 'http://africau.edu/images/default/sample.pdf'
          from: '+11234567890'
          to: '+11234567890'
          twilio_account_sid: ${{ secrets.TWILIO_ACCOUNT_SID }}
          twilio_auth_token: ${{ secrets.TWILIO_AUTH_TOKEN }}
      - name: Print Fax SID
        run: echo "${{ steps.fax.outputs.sid }}"
```

### Result
Here is the example where the same Twilio account is used for both - recepient and sender. [Random public PDF file](http://africau.edu/images/default/sample.pdf) is used for this demonstration as an example. This is the result of finished job:

![CI result](https://raw.githubusercontent.com/fabasoad/twilio-fax-action/main/screenshots/screenshot1.png)

Then the result can be checked by calling [REST API endpoint](https://www.twilio.com/docs/fax/api/fax-resource#fetch-a-fax-resource) to get information. Here is the result:

_Calling https://fax.twilio.com/v1/Faxes/FX03d290ea94e78658133d96f7f23bdf1b_
```json
{
	"media_sid": "ME1af5e3921f00ba485bda402b5e869af9",
	"status": "no-answer",
	"direction": "outbound",
	"from": "+11234567890",
	"date_updated": "2020-05-06T09:05:53Z",
	"price": null,
	"account_sid": "XXX",
	"to": "+11234567890",
	"date_created": "2020-05-06T09:05:36Z",
	"url": "https://fax.twilio.com/v1/Faxes/FX03d290ea94e78658133d96f7f23bdf1b",
	"sid": "FX03d290ea94e78658133d96f7f23bdf1b",
	"duration": 15,
	"num_pages": 2,
	"quality": "fine",
	"price_unit": null,
	"api_version": "v1",
	"media_url": "https://media.twiliocdn.com/fax/ACa412d07259a959d4ffa16cbc495906b2/eaf7542ade2c338d8d2cc76fcbf883e62c31336e60cb236f86ed66c8154ea9fb836fd88367880911529bdafed0e76cd34272123a4d656db61b120b95eaa3e069?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLWVhc3QtMSJHMEUCIQCXafBpleoQtRbv%2B9TRo97n1cleLFrTcPycSDj4LxPM7wIgENPtHRBJUArPW5GLKFYyH5e2WWZo%2F0y5C8OVZHHptKUqvQMIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMDExNjQ5MjE0MDgiDKIcHVNx4I1skJ%2FReCqRA6H1iWhAp6fPWZHtklDFKAD7ATVyXn6xIdUQVV05i3VNQ3pNnjByL1rfc1Nz8d1u9n%2FMTKHIQSXr4I9tXzHGCgks84CYlAj7xSaTeXPLVe1gl7q9okTnS%2BXWXt7GFmu7fMANuCnwVno%2Bdt1YAlNj6Dtnpf9LanaGS9RjFyJSlnmRiXaSq6vV06mgqa4t3x9lHr%2FLAWq8KvT1DWHBqgGAzL3gnPa6z7P%2BvrjJ8v0eoiPb6%2FRq1Qk1wo34VE91Imog3Rsh15n2lueUaj6AatF3azclJxoFU2RnbC2M3sZrHkCZZ0AwiMZPgCoNbmtmEKgigKJN82%2FjCAvMVm2G%2BazDNn6%2FQ90K9eCvdSiXQdLEe6d9qWR5Ehfx5GGuVMm%2BRq4ZIn1JPj9ttL3J6Qq8klzJwSsGkYv5qZcC4UUx%2B9dQIrddIRzVd6Ql4EqmZqAnb7mPqCR%2FhS%2BhGvbF3b7HY6ggMeAnh6M4FdLA%2BZOqTwKG98%2B%2B8NVqSIqtnKyHFYCAlz2ftoOXTepycbIH1p05mV%2FKXzGDMN%2F5yfUFOusBa9vCnqvhDSX6kzlAf3CvhmfGYwIlA7nhOr9jdpN7zonvX8zkzxnt6xDYXDmEotPem%2F%2B%2BZ1Pq9zAC7ec1ra3USY3iU6Ot5Gz9JLB4Hcw23szF4USUd76c2oPjY1YSNcFiZqJE2RUjavh%2FitN6GL9gMAX7qSWrF7uKKqKOxRR9g96weC1ohMwGX%2BNRSpfjFnPeoRYyTcjyFSm4hIDNnHgDX8ONFP%2BAGPIH0u1Bt8dWGcP1B4Z%2FlYHM2e1asQNwsuSVErmWJdlz9hP8EZmdbMQ2z%2BV53uvDuW2tuV0D97SIUNKlJBYzOKe8P8%2FyVw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200506T090728Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIAS5VS5DJAEBF4QLQ5%2F20200506%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b37e66d2c53dff87a009080f8ec94b3a852f03b99f01f75a65732dc08bff66de",
	"links": {
		"media": "https://fax.twilio.com/v1/Faxes/FX03d290ea94e78658133d96f7f23bdf1b/Media"
	}
}
```
Here is the result of calling `media_url` property:

![Fax result](https://raw.githubusercontent.com/fabasoad/twilio-fax-action/main/screenshots/screenshot2.png)

As you can see result document is the same as was defined in action argument, means that document has been sent by fax successfully.