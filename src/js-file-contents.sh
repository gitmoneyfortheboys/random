#!/bin/bash

# Find all .js files in current directory
files=$(find . -type f -name '*.js')

# Loop through each file and output its contents in the specified format
for file in $files; do
  filename=$(basename "$file")
  echo "$filename"
  # echo "```"
  cat "$file"
  # echo "```"
  echo ""
done