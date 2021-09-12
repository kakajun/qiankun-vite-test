#!/bin/bash

rm -rf ./dist

mkdir ./dist
mkdir ./dist/subapp

# sub-home子应用
cp -r ./sub-home/dist/ ./dist/subapp/sub-home/

# sub-first子应用
cp -r ./sub-first/dist/ ./dist/subapp/sub-first/

# main基座
cp -r ./main/dist/ ./dist/

# cd ./dist
# zip -r mp$(date +%Y%m%d%H%M%S).zip *
# cd ..
echo 'bundle.sh execute success.'
