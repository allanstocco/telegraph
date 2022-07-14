const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require('uuid').v4;
const path = require('path')



aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: "us-east-1",
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'telegraph-pictures',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldName })
        },
        key: (req, file, cb) => {
            console.log(file)
            const ext = path.extname(file.originalname)
            cb(null, `${uuid()}${ext}`);
        },
    }),
});


module.exports = upload;
