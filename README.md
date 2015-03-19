TL;DR;

Use curl to quickly send files to gist.

    $ curl -sT README.md cist.mdp.im
    # => https://gist.github.com/ed946bc6572be36f75e5

Feel free to use my heroku hosted service, or run your own.


# cist
## curl to gist
![cist](https://s3.amazonaws.com/img.mdp.im/cist.png)

### Why

I'm sometimes on a new machine and I'd like to stash something quickly. Rather
than setup the gist tool, I'd like to just curl the file and get back an
anonymous private gist.

cist does that.

### How

Curl the file you want to gist

    $ curl -sT index.js cist.mdp.im
    # => https://gist.github.com/ed946bc6572be36f75e5

This will return a gist URL with a single file named 'index.js' with the contents of index.js

### Using it from vi

Send a selection to a gist

`:'<,'>w !curl -sT - cist.mdp.im`

Gist the entire file

`:w !curl -sT - cist.mdp.im`

### Run your own 'cist' server

It's designed to run on Heroku. Run it on Heroku.

#### Further instructions

If you want to avoid the unauthenticated rate limit of 60 gists per hour, add some keys.

1. Go to your Github account settings page and create a new application
2. Add the keys the Heroku app

    heroku config:set CLIENT_ID="1234" CLIENT_SECRET="5678"

