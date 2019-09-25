package com.jksoftware.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.jksoftware.Response;
import com.jksoftware.model.Question;
import com.jksoftware.service.AwsService;
import com.jksoftware.service.IndexService;
import com.jksoftware.service.MongoDbService;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;

public class ReindexQuestions extends BaseHandler {

    private static final Logger LOG = Logger.getLogger(ReindexQuestions.class);
    private IndexService indexService = IndexService.getInstance();
    private AwsService awsService = AwsService.getInstance();
    private MongoDbService mongoDbService = MongoDbService.getInstance();

    @Override
    protected Response handle(final Map<String, Object> input, final Context context) throws Exception {
        final List<Question> questions = mongoDbService.findAllQuestions();
        indexService.reindexAllQuestions(questions);
        awsService.uploadIndexToS3();

        final Response responseBody = new Response("questions reindexed ", null);
        return responseBody;
    }

}

