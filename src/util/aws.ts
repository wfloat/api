import AWS from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";

const AWS_REGION = process.env.AWS_REGION!;
const AWS_SPEECH_BUCKET_NAME = process.env.AWS_SPEECH_BUCKET_NAME!;

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
  region: AWS_REGION,
});

const s3 = new S3({
  region: AWS_REGION,
});

// Function to upload a file to S3
export async function uploadSpeechToS3(fileBlob: Blob, fileName: string): Promise<string> {
  const params = {
    Bucket: AWS_SPEECH_BUCKET_NAME,
    Key: fileName,
    Body: fileBlob,
    ContentType: "audio/wav",
  };

  try {
    const data = await new Upload({
      client: s3,
      params,
    }).done();
    console.log(`File uploaded successfully. s3://${AWS_SPEECH_BUCKET_NAME}/${params.Key}`);
    if (!data.Key) {
      throw Error("S3 upload failed.");
    }
    return data.Key;
  } catch (err) {
    console.error("Error uploading file: ", err);
    throw err;
  }
}

// Function to generate a signed URL
export async function generateSpeechSignedUrl(objectKey: string): Promise<string> {
  const params = {
    Bucket: AWS_SPEECH_BUCKET_NAME,
    Key: objectKey,
    Expires: 60 * 60, // URL expiration time in seconds (e.g., 1 hour)
  };

  try {
    const url = await getSignedUrl(s3, new GetObjectCommand(params), {
      expiresIn: params.Expires,
    });
    console.log(`The URL is ${url}`);
    return url;
  } catch (err) {
    console.error("Error generating signed URL: ", err);
    throw err;
  }
}

// // Example usage
// const bucketName = "your-bucket-name";
// const filePath = "path/to/your/file";

// async function main() {
//   const objectKey = await uploadFileToS3(bucketName, filePath);
//   const signedUrl = await generateSignedUrl(bucketName, objectKey);
//   console.log(`Signed URL: ${signedUrl}`);
// }

// main().catch(console.error);
