#!/bin/bash

API="http://localhost:4741"
URL_PATH="/fileuploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "fileupload": {
      "title": "'"${TITLE}"'",
      "url": "'"${URL}"'",
      "size": "'"${SIZE}"'",
      "tag": ["tag1","tag2"]
    }
  }'

echo
