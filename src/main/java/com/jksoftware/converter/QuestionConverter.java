package com.jksoftware.converter;

import com.jksoftware.dto.QuestionDTO;
import com.jksoftware.model.Question;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.joining;

public class QuestionConverter {

    public static Document questionToDocument(final Question question) {
        final Document doc = new Document();
        doc.add(new TextField("id", question.getId().toHexString(), Field.Store.YES));
        doc.add(new TextField("title", question.getTitle(), Field.Store.YES));
        doc.add(new StringField("answer", question.getAnswer(), Field.Store.YES));
        doc.add(new TextField("tags", tagsToString(question.getTags()), Field.Store.YES));
        return doc;
    }

    public static QuestionDTO documentToQuestionDTO(final Document document) {
        return QuestionDTO.builder()
                .id(document.getFields().get(0).stringValue())
                .title(document.getFields().get(1).stringValue())
                .answer(document.getFields().get(2).stringValue())
                .tags(asList(document.getFields().get(3).stringValue().split(",")))
                .build();
    }

    public static QuestionDTO questionToQuestionDTO(final Question question) {
        return QuestionDTO.builder()
                .id(question.getId().toString())
                .title(question.getTitle())
                .answer(question.getAnswer())
                .tags(question.getTags())
                .build();
    }

    private static String tagsToString(final List<String> tags) {
        return tags.stream().map(e -> e.replaceAll("\\s+", "")).collect(joining(","));
    }
}
