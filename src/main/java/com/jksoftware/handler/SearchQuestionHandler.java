package com.jksoftware.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.jksoftware.ColdStartInitializer;
import com.jksoftware.Response;
import com.jksoftware.dto.QuestionDTO;
import com.jksoftware.service.AwsService;
import com.jksoftware.service.IndexService;
import org.apache.log4j.Logger;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.text.MessageFormat.format;
import static java.util.Arrays.asList;
import static java.util.Objects.nonNull;

public class SearchQuestionHandler extends BaseHandler {
    private static final Logger LOG = Logger.getLogger(SearchQuestionHandler.class);
    private static IndexService indexService = IndexService.getInstance();
    private static AwsService awsService = AwsService.getInstance();

    @Override
    protected Response handle(final Map<String, Object> input, final Context context) throws Exception {
        final Map<String, String> searchParams = (LinkedHashMap<String, String>) input.get("queryStringParameters");
        final String title = searchParams.get("search");
        final boolean loadIndex = Boolean.parseBoolean(searchParams.get("loadIndex"));
        final List<String> tags = nonNull(searchParams.get("tags")) ? asList(searchParams.get("tags").split(",")) : null;

        if (loadIndex) {
            awsService.downloadIndexFromS3();
        }

        final List<QuestionDTO> hits = indexService.searchQuestions(title, tags);
        final Response responseBody = new Response(format("questions  {0} - {1}", title, tags), hits);
        return responseBody;
    }
}
