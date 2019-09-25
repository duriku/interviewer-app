package com.jksoftware.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.jksoftware.Response;
import com.jksoftware.dto.AdminRequestDTO;
import com.jksoftware.service.AdminFacade;

import java.util.Map;

public class AdminHandler extends BaseHandler {
    private AdminFacade adminFacade = AdminFacade.getInstance();

    @Override
    protected Response handle(final Map<String, Object> input, final Context context) throws Exception {
        final AdminRequestDTO adminRequestDTO = convertBodyToPojo(input, AdminRequestDTO.class);
        final Response responseBody;

        switch (adminRequestDTO.getCommand()) {
            case CREATE:
                responseBody = adminFacade.createQuestion(adminRequestDTO.getQuestion());
                break;
            case UPDATE:
                responseBody = adminFacade.updateQuestion(adminRequestDTO.getQuestion());
                break;
            case DELETE:
                responseBody = adminFacade.deleteQuestion(adminRequestDTO.getQuestionId());
                break;
            case UPLOAD_INDEX:
                responseBody = adminFacade.uploadIndex();
                break;

            default:
                throw new IllegalStateException("Unexpected value: " + adminRequestDTO.getCommand());
        }

        return responseBody;
    }
}
