#!/usr/bin/env bash
cd ../Deploy
docker-compose build
docker-compose up -d