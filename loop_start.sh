#!/bin/bash

set -x

while true
do
	yarn start -p 8888 -h 0.0.0.0 --no-open
	echo "Exited, restarting..."
	sleep 1
done

