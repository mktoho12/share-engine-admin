#!/bin/bash

# Read .tool-versions file and install each version specified
while IFS= read -r line; do
  tool=$(echo $line | awk '{print $1}')
  version=$(echo $line | awk '{print $2}')
  asdf install $tool $version
done < .tool-versions
