FROM golang:1.5

RUN apt-get -qq update \
	&& DEBIAN_FRONTEND=noninteractive apt-get -qq install -y --no-install-recommends python-pygments awscli \
	&& rm -rf /var/lib/apt/lists/*

RUN go get github.com/spf13/hugo 

RUN mkdir /usr/share/site
WORKDIR /usr/share/site

EXPOSE 1313

VOLUME /usr/share/site

CMD hugo --theme=purehugo --buildDrafts
