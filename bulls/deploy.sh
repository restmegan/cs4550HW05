#!/bin/bash
# This is deploy.sh
# Taken from class notes
# https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/08-server-state/notes.md

mix deps.get --only prod
mix compile

npm install --prefix ./assets
npm run deploy --prefix ./assets
mix phx.digest

mix release

