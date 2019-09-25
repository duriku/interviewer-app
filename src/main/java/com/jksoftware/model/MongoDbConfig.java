package com.jksoftware.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MongoDbConfig {
    private String connectionString;
    private String database;
}
