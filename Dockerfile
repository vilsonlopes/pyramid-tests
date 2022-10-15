FROM node:16.16.0-slim

RUN apt install bash

WORKDIR /home/vilsonlopes/node/app

USER node

CMD [ ".docker/start.sh" ]