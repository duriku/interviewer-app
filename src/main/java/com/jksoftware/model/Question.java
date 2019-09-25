package com.jksoftware.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    private ObjectId id;

    private String title;

    // short answer, store it in the index, the long answer will be stored in a separate object, markdown based??? (can contain images, code snippets, etc)
    private String answer;

    private List<String> tags;
}
