package com.jksoftware.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.jksoftware.handler.BaseHandler;
import com.jksoftware.model.AwsConfig;
import org.apache.log4j.Logger;

import java.io.File;

import static com.jksoftware.config.InterviewerConfig.AWS_REGION;
import static com.jksoftware.config.InterviewerConfig.CONFIG;
import static com.jksoftware.config.InterviewerConfig.LAMBDA_INDEX_FOLDER;
import static com.jksoftware.config.InterviewerConfig.S3_BUCKET;
import static com.jksoftware.config.InterviewerConfig.S3_INDEX_FOLDER;
import static com.jksoftware.config.InterviewerConfig.S3_ZIP_FILE_PATH;
import static com.jksoftware.util.FileUtil.unZipDirectory;
import static com.jksoftware.util.FileUtil.zipDirectory;
import static java.text.MessageFormat.format;
import static org.apache.commons.io.FileUtils.copyInputStreamToFile;

public class AwsService {
    private static final Logger LOG = Logger.getLogger(BaseHandler.class);

    private static final AwsService INSTANCE = new AwsService();
    private final AmazonS3 s3Client;

    public static AwsService getInstance() {
        return INSTANCE;
    }

    private AwsService() {
        final AwsConfig awsConfig = CONFIG.getAwsConfig();
        final BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsConfig.getAccessKey(), awsConfig.getSecretKey());
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(AWS_REGION)
                .build();
    }

    public void uploadIndexToS3() {
        final String zipFilePath = "/tmp/test.zip";

        zipDirectory(LAMBDA_INDEX_FOLDER, zipFilePath);
        final File zippedFile = new File(zipFilePath);

        PutObjectRequest request = new PutObjectRequest(S3_BUCKET, S3_INDEX_FOLDER + zippedFile.getName(), zippedFile);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("plain/text");
        metadata.addUserMetadata("x-amz-meta-title", zippedFile.getName());
        request.setMetadata(metadata);
        s3Client.putObject(request);
    }

    public void downloadIndexFromS3() {
        try {
            LOG.info("Downloading index from S3");
            final S3Object s3Object = s3Client.getObject(S3_BUCKET, S3_ZIP_FILE_PATH);
            final File zippedFile = new File("/tmp/test.zip");
            copyInputStreamToFile(s3Object.getObjectContent(), zippedFile);
            unZipDirectory(zippedFile.getPath(), LAMBDA_INDEX_FOLDER);
        } catch (Exception e) {
            LOG.error(format("Could not download index {0} from S3!", S3_ZIP_FILE_PATH), e);
        }
    }
}
