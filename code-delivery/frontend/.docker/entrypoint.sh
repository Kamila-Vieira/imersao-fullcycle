#!/bin/bash
# run before chmod +x .docker/entrypoint.sh

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install

npm start