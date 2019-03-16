#!/bin/bash

set -e

BASH_RELATIVE_PATH="${BASH_SOURCE%/*}"
cd "${BASH_RELATIVE_PATH}/../kubernetes/out"

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
