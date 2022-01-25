import { S3 } from "@aws-sdk/client-s3";

/* 
Region does not matter for Digital Ocean Spaces.
S3 SDK uses it internally for verification purposes.
The endpoint parameter is where the API requests are
actually directed at.

Access ID and secret are generated in the section 
"API" > "Spaces Access Keys" on your DigitalOcean user page.
*/
const s3Client = new S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  accessKeyId: process.env.SPACES_ACCESS_ID,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
});

export default s3Client;
