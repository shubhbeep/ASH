import express  from "express";
import {S3} from "aws-sdk"

const s3 = new S3 ({
    accessKeyId : "c8ed418b758e442a3ecf92c2dc2a5d68",
    secretAccessKey : "fc6a8801858be99d2ec663110821acd48cf30a7df299204963cfd02e6a7479e2",
    endpoint : "https://dc553d00697f8aa991791538d7097af3.r2.cloudflarestorage.com"
})


const app = express();

app.get("/*", async (req, res) => {

    const host = req.hostname;
    console.log(host);
    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "ash",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001,()=>{
    console.log("Server is running on Port 3001");
});