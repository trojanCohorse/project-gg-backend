# Gilmore Girls API

Welcome to Stars Hollow, developer! This API aims to provide a log and an explanation of the millions of pop culture references that may have flown by you while you were watching the Gilmore Girls. Data includes references by season, episode number, timestamp, and even screenshots of the reference, when it was said - all in JSON format. We hope that you enjoy this API - whether you are simply using the database or you want to add to it!

## Access to API

No apiKey required! Simply find the desired endpoint below!

Root-Endpoint: `https://project-gg.herokuapp.com`

## GET requests

References can be requested by all references in the series, in the season, and within a specific episode:

| Route                                    | Description                                                                                 | Example                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `/seasons`                               | All the references in the series in chronological order. Everything you could ever hope for | `https://project-gg.herokuapp.com/`                     |
| `/seasons/:seasonId`                     | All references in the specified season. Enter 1-7 for the season you want.                  | `https://project-gg.herokuapp.com/3`                    |
| `/seasons/:seasonId/episodes/:episodeId` | All references in a specific episode in a season. I guess you are being reasonable.         | `https://project-gg.herokuapp.com/seasons/1/episodes/2` |

## Posting to API

Want to help us fill out the database? We would absolutely love your input. You can post to this endpoint:

`seasons/references/add`

Please use this format:

`
{
  "seasonNumber": "",

  "episodeNumber": "",

  "references": [{}]
}
`

First specify the season number and episode number in your request - this is required!
"seasonNumber" must be between 1-7, "episodeNumber" must be a valid episode number within the specified season.

The references array
"references" must be an object inside an array! Within that object, use the following keys in key/value pairs:

`"subject": ""` - What is the subject matter of the reference? What are they talking about?

`"timestamp": ""` - Timestamp of quote in the episode

`"quote": ""` - Quote that contains the reference

`"speaker": ""` - Who makes the reference?

`"context": ""` - How does the quote come up? Give a brief description

`"meaning": ""` - What does the reference mean? Why is it important here?

`"screenshot": ""` - This is the bonus one! Take a screenshot of the moment the reference is made, upload it online, and provide the URL here!

Here is an example:

```{

    "subject": "Jack Kerouac",

    "timestamp": "1:27",

    "quote": "You're a regular Jack Kerouac.",

    "speaker": "Lorelai",

    "context": "Lorelai is approached by a stranger who flirts with her at Luke's diner. He tells her that he is just passing by Stars Hollow to Hartford, and this is Lorelai's response",

    "meaning": "Jack Kerouac was famous for his travels, which lead to his novel 'On The Road'.",

    "screenshot": "https://some-picture-hosting-website.com/image"

}
```

Too much? Swing by our website and post your reference via our form!

## Website
https://gilmoregirlsapi.netlify.app/

## Thank you!

Thats it! We hope you enjoy this API, made by Asif, Boris, Caitlin, and Greg.
