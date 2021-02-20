#!/bin/bash
# This is deploy.sh
# Taken from class notes
# https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/08-server-state/notes.md

export MIX_ENV=prod
export PORT=4801
export SECRET_KEY_BASE=insecure

mix deps.get --only prod
mix compile

CFGD=$(readlink -f ~/.config/hangman)

if [ ! -d "$CFGD" ]; then
    mkdir -p $CFGD
fi

if [ ! -e "$CFGD/base" ]; then
    mix phx.gen.secret > "$CFGD/base"
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

npm install --prefix ./assets
npm run deploy --prefix ./assets
mix phx.digest

mix release
