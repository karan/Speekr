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

Requires sign-in

`GET /next_thing`

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
