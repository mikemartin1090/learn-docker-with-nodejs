#! /usr/bin/env bash

# fancy stuff that Hudgens/Ian use...
# MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# PARENT_DIR=$(dirname "${MY_DIR}")
# WORKING_DIR=$(echo "${PWD}" | perl -pe "s|${PARENT_DIR}|/app|")

# Docker run parameters that I may want to use!
# --rm \
# -it \
# --network="host" \

docker run \
  --name node-app \
  -d \
  --env-file ./.env \
  -p 3000:4000 \
  -v $PWD:/app:ro \
  -v /app/node_modules \
  node-app-image:latest