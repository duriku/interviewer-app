package com.jksoftware.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jksoftware.model.SecretConfig;
import com.jksoftware.util.FileUtil;

import java.io.IOException;

public class InterviewerConfig {
    public static final String LAMBDA_INDEX_FOLDER = "/tmp/index.lucene/";
    public static final String S3_INDEX_FOLDER = "interviewer/index.lucene/";
    public static final String ZIP_FILE_NAME = "test.zip";
    public static final String S3_ZIP_FILE_PATH = S3_INDEX_FOLDER + ZIP_FILE_NAME;

    public static final String S3_BUCKET = "juraj-repo-london";
    public static final String AWS_REGION = "eu-west-2";
    public static final SecretConfig CONFIG = loadConfig();

    static SecretConfig loadConfig() {
        try {
            final ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(FileUtil.readFileFromResources("config.json"), SecretConfig.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
