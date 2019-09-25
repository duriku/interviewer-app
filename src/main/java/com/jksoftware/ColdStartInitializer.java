package com.jksoftware;

import com.jksoftware.service.AwsService;

public class ColdStartInitializer {
    private static final AwsService awsService = AwsService.getInstance();

    public static void initialize() {
        awsService.downloadIndexFromS3();
    }
}
