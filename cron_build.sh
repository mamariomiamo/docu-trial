#!/bin/bash

cd /home/tsluser/docusaurus_html/tl-tech-details/
echo "Start building now"
while true
do
    yarn build
    if [[ $? == 0 ]]; then
        echo "Build success quit"
        break
    fi
    echo "Build failed, retry in 30 seconds"
    sleep 30
done