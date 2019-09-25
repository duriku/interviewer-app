package com.jksoftware.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AwsConfig {
    private String accessKey;
    private String secretKey;
}
