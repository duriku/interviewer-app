package com.jksoftware;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Response {

    @NonNull
    private final String message;

    private final Object body;

    private Long executionTimeInMs;
}
