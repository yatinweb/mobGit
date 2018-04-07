FROM node:7 as build
WORKDIR /mobGit

# Xvfb
RUN apt-get update -qqy \
    && apt-get -qqy install xvfb \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update -qqy \
    && apt-get -qqy install google-chrome-stable \
    && rm /etc/apt/sources.list.d/google-chrome.list \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
    && sed -i 's/"$HERE\/chrome"/xvfb-run "$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome

#Vim
RUN apt-get update -qqy \
    && apt-get -qqy install vim

COPY package.json /mobGit
RUN npm install -g @angular/cli
RUN npm install

COPY . /mobGit

#Replace a setting in the Karma test runner to only run once  
RUN sed -i "s|singleRun: false|singleRun: true|g" karma.conf.js
RUN npm run test:ci && npm run build

#Using multi-stage builds to keep images small and separate build from deployment
FROM nginx:1.13.3-alpine as deploy

ADD default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /mobGit/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]