import { Upload } from "@aws-sdk/lib-storage";
import s3Client from "../config/s3Client.js";
import { v4 as uuidv4 } from "uuid";
import log from "../config/logging.js";
import path from "path";

/* 
What is params?

Its type is effectively the following: 

Omit means that "Body" is removed from PutObjectRequest and then replaced with & extension
by a redefinition which accepts the original definition of "Body" plus string, UInt8Array, and buffer

The original definition of "Body" is one of "Readable", "ReadableStream", and "Blob"

type PutObjectCommandInputType = Omit<PutObjectRequest, "Body"> & {
 
   For *`PutObjectRequest["Body"]`*, see {@link PutObjectRequest.Body}.
   Body: PutObjectRequest["Body"] | string | Uint8Array | Buffer;
  };

In addition to "Body", there is an "ACL" param, which accepts a string. In this app, it
should be "public-read".

"Key" specifies the name for the file.

"Bucket" specifies the name of the container.
*/

export default async function uploadToSpaces(req, res, next) {
  try {
    log.info("Starting to upload images to Spaces.");
    const imageIds = await Promise.all(
      req.body.images.map(async (object) => {
        const uuid = uuidv4();

        const uploadThumbnail = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.SPACES_BUCKET,
            Key: `thumbnail/${uuid}.webp`,
            Body: object.thumbnail,
            ACL: "public-read",
          },
        });

        const uploadOriginal = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.SPACES_BUCKET,
            Key: `original/${uuid}.webp`,
            Body: object.original,
            ACL: "public-read",
          },
        });

        uploadThumbnail.on("httpUploadProgress", (progress) => {
          log.info(
            `Thumbnail image upload progress: ${JSON.stringify(progress)}`
          );
        });

        uploadOriginal.on("httpUploadProgress", (progress) => {
          log.info(
            `Original image upload progress: ${JSON.stringify(progress)}`
          );
        });

        await uploadThumbnail.done();
        await uploadOriginal.done();
        return uuid;
      })
    );
    req.imageIds = imageIds;
    next();
  } catch (error) {
    next(error);
  }
}
