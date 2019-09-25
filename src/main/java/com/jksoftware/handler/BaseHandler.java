package com.jksoftware.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jksoftware.ApiGatewayResponse;
import com.jksoftware.ColdStartInitializer;
import com.jksoftware.Response;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static java.lang.System.currentTimeMillis;


public abstract class BaseHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final Logger LOG = Logger.getLogger(BaseHandler.class);

    // TODO: merge the 3 object mappers into one
    private ObjectMapper objectMapper = new ObjectMapper();

    static {
        ColdStartInitializer.initialize();
    }

    protected abstract Response handle(Map<String, Object> input, Context context) throws Exception;

    @Override
    public ApiGatewayResponse handleRequest(final Map<String, Object> input, final Context context) {
        final long started = currentTimeMillis();
        Response responseBody;
        int statusCode;

        final Map<String, Object> headers = createHeaders();
        try {
            responseBody = handle(input, context);
            responseBody.setExecutionTimeInMs(currentTimeMillis() - started);
            statusCode = 200;
        } catch (Exception e) {
            LOG.error(e);
            responseBody = new Response("Error occurred", e.toString());
            statusCode = 500;
        }

        return ApiGatewayResponse.builder()
                .setStatusCode(statusCode)
                .setObjectBody(responseBody)
                .setHeaders(headers)
                .build();
    }

    private Map<String, Object> createHeaders() {
        final Map<String, Object> headers = new HashMap<>();
        headers.put("X-Powered-By", "AWS Lambda & Serverless");
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Credentials", true);
        return headers;
    }

    protected <T> T convertBodyToPojo(final Map<String, Object> request, final Class<T> type) throws IOException {
        return convertInputToPojo(request, "body", type);
    }

    // TODO: test it
    protected <T> T convertQueryParamsToPojo(final Map<String, Object> request, final Class<T> type) throws IOException {
        return convertInputToPojo(request, "queryStringParameters", type);
    }

    private <T> T convertInputToPojo(final Map<String, Object> request, final String input, final Class<T> type) throws IOException {
        final String obj = (String) request.get(input);
        return objectMapper.readValue(obj, type);
    }
}
