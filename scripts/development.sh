#!/bin/bash

if [ -z "$1" ]; then
    go get github.com/oxequa/realize
    node ui/util/cors-server.js &
    cd ui && npm start &
    rm -f server.log && touch server.log && tail -f server.log &
    realize start
fi

if [ "$1" == "go-server" ]; then
    DEBUG=true ./mobile-developer-console -kubeconfig ~/.kube/config &>server.log
fi

if [ "$1" == "kill-go-server" ]; then
    pkill mobile-developer-console
fi
