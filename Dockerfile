FROM node:7
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
RUN npm test && npm run build