#!/bin/bash

set -e

BASH_RELATIVE_PATH="${BASH_SOURCE%/*}"
cd "${BASH_RELATIVE_PATH}/../kubernetes"

mkdir ./out

cat deployment.yaml | envsubst > ./out/deployment.yaml
cat service.yaml | envsubst > ./out/service.yaml
cat ingress.yaml | envsubst > ./out/ingress.yaml
