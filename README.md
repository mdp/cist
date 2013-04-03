# cist
## curl to gist
![cist](https://s3.amazonaws.com/img.mdp.im/cist.png)

### Why

I'm sometimes on a new machine and I'd like to stash something quickly. Rather
than setup the gist tool, I'd like to just curl the file and get back an
anonymous private gist.

cist does that.

### How

    $ curl --data-binary @README.md http://cist.herokuapp.com/read.md
    # => https://gist.github.com/32d1b11087f326a9653f

### Setup

It's designed to run on Heroku. Run it on Heroku.

#### Further instructions

If you want to avoid the unauthenticated rate limit of 60 gists per hour, add some keys.

1. Go to your Github account settings page and create a new application
2. Add the keys the Heroku app

    heroku config:set CLIENT_ID="1234" CLIENT_SECRET="5678"

