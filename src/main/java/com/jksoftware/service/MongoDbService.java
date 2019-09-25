package com.jksoftware.service;

import com.jksoftware.model.MongoDbConfig;
import com.jksoftware.model.Question;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.jksoftware.config.InterviewerConfig.CONFIG;
import static com.mongodb.MongoClient.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class MongoDbService {
    private static final String QUESTIONS_COLLECTION = "questions";

    private static MongoDbService instance = new MongoDbService();

    public static MongoDbService getInstance() {
        return instance;
    }

    private MongoDatabase database;

    private MongoDbService() {
        // Create a CodecRegistry containing the PojoCodecProvider instance.
        final CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        final CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));

        final MongoDbConfig mongoDbConfig = CONFIG.getMongoDbConfig();
        final MongoClientURI uri = new MongoClientURI(mongoDbConfig.getConnectionString());
        final MongoClient mongoClient = new MongoClient(uri);

        this.database = mongoClient.getDatabase(mongoDbConfig.getDatabase())
                .withCodecRegistry(pojoCodecRegistry);
    }

    public List<Question> findAllQuestions() {
        final MongoCollection<Question> collection = database.getCollection(QUESTIONS_COLLECTION, Question.class);
        final List<Question> questions = StreamSupport.stream(collection.find().spliterator(), false).collect(Collectors.toList());
        return questions;
    }

    public void addQuestion(final Question question) {
        final MongoCollection<Question> collection = database.getCollection(QUESTIONS_COLLECTION, Question.class);
        collection.insertOne(question);
    }

    public void deleteQuestion(final String questionId) {
        final MongoCollection<Question> collection = database.getCollection(QUESTIONS_COLLECTION, Question.class);
        collection.deleteOne(eq("_id", new ObjectId(questionId)));
    }

    public void updateQuestion(final Question question) {
        final MongoCollection<Question> collection = database.getCollection(QUESTIONS_COLLECTION, Question.class);
        collection.replaceOne(eq("_id", question.getId()), question);
    }
}
