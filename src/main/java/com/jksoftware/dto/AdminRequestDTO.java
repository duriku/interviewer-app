package com.jksoftware.dto;

import com.jksoftware.enums.CommandType;
import com.jksoftware.model.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminRequestDTO {
    private Question question;
    private CommandType command;
    private String questionId;
}
