package com.jksoftware.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {

    private String id;

    private String title;

    // short answer, store it in the index, the long answer will be stored in a separate object, markdown based??? (can contain images, code snippets, etc)
    private String answer;

    private List<String> tags;
}
