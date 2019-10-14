npm run build
aws s3 cp --recursive build/  s3://interviewer.guru --acl public-read
