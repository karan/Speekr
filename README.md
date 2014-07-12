Speekr
======

Improve your fucking accent

### Quickstart

#### Start server

```bash
$ nodemon .
```

#### Start development

```bash
$ gulp
```

## API

**Requires sign-in**

#### `/`

Return `user` if the user is logged in otherwise not.

#### `GET /user`

Returns details of logged in user in JSON format.

Returns 401 error and `{}` if no user logged in

#### `GET /next_thing`

Parameters:

`lang`: `en`, `es`, `zh`

Response:

    {
      thingType: "1",
      lang: "en",
      thing: "your",
      _id: "53c0d3d33d0a940000b5aab8",
      __v: 0,
      created_at: "2014-07-12T06:21:07.468Z"
    }

## Calculate score between strings:

    script(src="js/levenshtein.js")
    script(src="js/score.js")

    Score("abc", "abcd")
    >> 2

## Icons

    link(href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css", rel="stylesheet")

    fa-microphone - click to start listening, listen again

    fa-repeat - re-listen the text

    fa-arrow-right - skip/next thing
