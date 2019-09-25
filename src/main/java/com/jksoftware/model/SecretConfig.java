package com.jksoftware.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SecretConfig {
    private AwsConfig awsConfig;
    private MongoDbConfig mongoDbConfig;
}
