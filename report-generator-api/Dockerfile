FROM node:16.3.0-alpine
WORKDIR /usr/src/app

RUN apk add --no-cache \
    python3 \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libjpeg \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev;

RUN apk add --update  --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family fontconfig

RUN apk add vips-dev fftw-dev build-base --no-cache \
        --repository http://dl-3.alpinelinux.org/alpine/edge/community \
        --repository http://dl-3.alpinelinux.org/alpine/edge/main

#  add glibc and install canvas
RUN apk --no-cache add ca-certificates wget  && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
    apk add glibc-2.29-r0.apk && \
    npm install canvas@2.11.0;

COPY . .

RUN npm install

EXPOSE 3001
CMD npm start