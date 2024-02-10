import * as AWS from "aws-sdk";
import * as fs from "fs";

const AWS_REGION = process.env.AWS_REGION!;
const AWS_SPEECH_BUCKET_NAME = process.env.AWS_SPEECH_BUCKET_NAME!;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Function to upload a file to S3
export async function uploadSpeechToS3(fileBlob: Blob): Promise<string> {
  const params = {
    Bucket: AWS_SPEECH_BUCKET_NAME,
    Key: "your-file-name", // e.g., 'folder/subfolder/file.txt'
    Body: fileBlob,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. s3://${AWS_SPEECH_BUCKET_NAME}/${params.Key}`);
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
    const url = await s3.getSignedUrlPromise("getObject", params);
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
