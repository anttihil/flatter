import { Upload } from "@aws-sdk/lib-storage";
import s3Client from "../config/s3Client.js";
import { v4 as uuidv4 } from "uuid";
import log from "../config/logging.js";

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
    const imageIds = await Promise.all(
      req.body.images.map(async (object) => {
        const uuid = uuidv4();
        const uploadOriginal = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.SPACES_BUCKET,
            Key: `original/${uuid}`,
            Body: object.original,
            ACL: "public-read",
          },
        });
        console.log(s3Client.config.endpoint);
        console.log(s3Client.config.credentials);

        const uploadThumbnail = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.SPACES_BUCKET,
            Key: `thumbnail/${uuid}`,
            Body: object.thumbnail,
            ACL: "public-read",
          },
        });

        uploadOriginal.on("httpUploadProgress", (progress) => {
          log.info(progress);
        });

        uploadThumbnail.on("httpUploadProgress", (progress) => {
          log.info(progress);
        });

        await uploadOriginal.done();
        await uploadThumbnail.done();
        return uuid;
      })
    );
    req.imageIds = imageIds;
    next();
  } catch (error) {
    console.log(error);
    if (error.$metadata) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.log({ requestId, cfId, extendedRequestId });
    }
    next(error);
  }
}
