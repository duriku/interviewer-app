package com.jksoftware;

import com.jksoftware.handler.AdminHandler;
import com.jksoftware.handler.ReindexQuestions;
import com.jksoftware.handler.SearchQuestionHandler;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static java.lang.String.format;


public class App {
    public static void main(String[] args) {
        final Map<String, Object> inputForSearch = new HashMap<>();
        inputForSearch.put("queryStringParameters", getQueryStringParams());

        final Map<String, Object> adminPayload = new HashMap<>();
//        adminPayload.put("body", deleteQuestion("5d9119804cd4aa1df414e397"));
        adminPayload.put("body", createQuestion());
        // 5d93a632efca7e38357408ee

        new ReindexQuestions().handleRequest(new HashMap<>(), null);
//        System.out.println(new SearchQuestionHandler().handleRequest(inputForSearch, null));
        // new AdminHandler().handleRequest(inputForAdding, null);
//         new AdminHandler().handleRequest(adminPayload, null);
        System.out.println(new SearchQuestionHandler().handleRequest(inputForSearch, null));
    }

    private static Map<String, Object> getQueryStringParams() {
        final Map<String, Object> params = new LinkedHashMap<>();
        params.put("search", "java");
        return params;
    }

    private static String createQuestion() {
        return "{\"title\":\"TodayisSunday23223_8 3\",\"answer\":\"----siadfgsdafogsdgofsdguoagfsddfgaysoudfgsadoufgyduosgfyuewgyfyusdafgsuadfygsauodfgysudofgysoadufgasoudfgasoudyfgsdaouygsauofdysga\",\"tags\":[\"one\",\"two\"]}";
    }

    private static String updateQuestion(final String id, final String question) {
        return format("{\"command\":\"UPDATE\",\"question\":{\"title\":\"%s\",\"answer\":\"----siadfgsdafogsdgofsdguoagfsddfgaysoudfgsadoufgyduosgfyuewgyfyusdafgsuadfygsauodfgysudofgysoadufgasoudfgasoudyfgsdaouygsauofdysga\",\"tags\":[\"eleven\"],\"id\":\"%s\"}}", question, id);
    }

    private static String deleteQuestion(final String id) {
        return format("{\"command\":\"DELETE\",\"questionId\":\"%s\"}",id);
    }
}
