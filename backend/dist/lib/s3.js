"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = exports.deleteFromS3 = exports.uploadToS3 = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
exports.s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET = process.env.AWS_BUCKET_NAME;
// ─── Upload file to S3 ────────────────────────────────────
const uploadToS3 = async (file, folder = 'uploads') => {
    const key = `${folder}/${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });
    await exports.s3Client.send(command);
    return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
exports.uploadToS3 = uploadToS3;
// ─── Delete file from S3 ──────────────────────────────────
const deleteFromS3 = async (url) => {
    const key = url.split('.amazonaws.com/')[1];
    if (!key)
        return;
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
    });
    await exports.s3Client.send(command);
};
exports.deleteFromS3 = deleteFromS3;
// ─── Get presigned URL (for direct upload) ────────────────
const getPresignedUrl = async (key, contentType) => {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: contentType,
    });
    return (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, command, { expiresIn: 3600 });
};
exports.getPresignedUrl = getPresignedUrl;
