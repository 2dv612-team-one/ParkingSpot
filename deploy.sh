#!/bin/bash


cd ~/test

sudo docker-compose down

sudo docker system prune --volumes -f

sudo docker-compose up -d --build

