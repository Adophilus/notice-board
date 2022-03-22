#! /data/data/com.termux/files/usr/bin/bash

inotifywait --monitor --exclude .git,node_modules --event create,delete,move,modify --fromfile .bin/watched-files.txt | xargs -I{} go-sync deploy development
