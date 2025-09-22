#!/bin/bash
cd /home/kavia/workspace/code-generation/browser-playful-game-7897-7906/game_webapp_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

