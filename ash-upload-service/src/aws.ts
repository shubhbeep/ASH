//filename => output/12213/src/app.jsx
//filepath =>/Users/Shubh/ash/dist/output/12213/src/app.jsx
import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3 ({
    accessKeyId : "c8ed418b758e442a3ecf92c2dc2a5d68",
    secretAccessKey : "fc6a8801858be99d2ec663110821acd48cf30a7df299204963cfd02e6a7479e2",
    endpoint : "https://dc553d00697f8aa991791538d7097af3.r2.cloudflarestorage.com"
})
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "ash",
        Key: fileName,
    }).promise();
    console.log(fileName);
    console.log(response);
}