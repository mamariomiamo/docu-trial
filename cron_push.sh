#!/bin/bash

cd /home/tsluser/docusaurus_html/tl-tech-details/
echo "Start git push now"

git add .
git commit -m "incremental backup" && git push

echo "End git push"