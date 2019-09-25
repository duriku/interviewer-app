package com.jksoftware.service;

import com.jksoftware.Response;
import com.jksoftware.dto.AdminRequestDTO;
import com.jksoftware.model.Question;

import java.io.IOException;

import static com.jksoftware.converter.QuestionConverter.questionToQuestionDTO;

public class AdminFacade {
    private static final AdminFacade INSTANCE = new AdminFacade();

    private IndexService indexer = IndexService.getInstance();
    private AwsService awsService = AwsService.getInstance();
    private MongoDbService mongoDbService = MongoDbService.getInstance();

    public static AdminFacade getInstance() {
        return INSTANCE;
    }

    public Response createQuestion(final Question question) throws IOException {
        final Response responseBody;
        mongoDbService.addQuestion(question);
        indexer.indexQuestion(question);
        responseBody = new Response("questions added", questionToQuestionDTO(question));
        return responseBody;
    }

    public Response updateQuestion(final Question question) throws IOException {
        final Response responseBody;
        mongoDbService.updateQuestion(question);
        indexer.updateIndex(question);
        responseBody = new Response("questions updated", questionToQuestionDTO(question));
        return responseBody;
    }

    public Response deleteQuestion(final String questionId) throws IOException {
        final Response responseBody;
        mongoDbService.deleteQuestion(questionId);
        indexer.removeQuestionFromIndex(questionId);
        responseBody = new Response("question deleted", questionId);
        return responseBody;
    }

    public Response uploadIndex() {
        final Response responseBody;
        awsService.uploadIndexToS3();
        responseBody = new Response("uploaded index to s3", null);
        return responseBody;
    }
}
