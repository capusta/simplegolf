#!/bin/bash
set -eu
sudo apt-get install python-software-properties -y
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

sudo apt-get install nodejs -y

node -v
npm -v
