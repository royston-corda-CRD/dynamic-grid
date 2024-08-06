#!/bin/sh

kubectl config use-context docker-desktop

# Update Helm Alpha standard chart with the latest version based on Chart.yaml
helm dep update helm/charts/dynamic-grid

skaffold run -v=info -p docker-desktop