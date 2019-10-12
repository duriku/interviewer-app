import axios from "axios";

export const API_ROOT = 'https://dvpw083q5a.execute-api.eu-west-2.amazonaws.com/dev';

export const searchQuestionsAPI = async (searchText, tags, inputPayload, numberOfQuestionsToShow) => {
    const payload = inputPayload || {};

    if (!!tags && tags.length > 0) {
        payload.tags = tags.join(',');
    }

    if (searchText) {
        payload.search = searchText;
    }

    payload.questionCount = numberOfQuestionsToShow;
    return getQuestion(payload);
}

export const reindexQuestionsAPI = async () => {
    return getQuestion(null, "/index");
}

export const commitQuestionsAPI = async () => {
    const requestBody = {
        command: "UPLOAD_INDEX",
    }
    return postQuestion(requestBody);
}

export const createQuestionAPI = async ({title, answer, tags}) => {
    return createOrUpdateQuestion({title, answer, tags}, 'CREATE');
}

export const updateQuestionAPI = async ({title, answer, tags, questionId}) => {
    return createOrUpdateQuestion({title, answer, tags, questionId}, 'UPDATE');
}

export const removeQuestionAPI = async (questionId) => {
    const requestBody = {
        command: "DELETE",
        questionId
    }
    return postQuestion(requestBody);
}

const createOrUpdateQuestion = async ({title, answer, tags, questionId}, command) => {
    const requestBody = {
        command,
        question: {
            id: questionId,
            title,
            answer,
            tags: Array.isArray(tags) ? tags : tags.split(",")
        }
    }
    return postQuestion(requestBody);
}

const getQuestion = async (params, path) => {
    try {
        // TODO: construct queryString
        return (await axios.get(`${API_ROOT}/questions${path ? path : ''}`, {params})).data.body
    } catch (error) {
        console.error(error);
    }
}


const postQuestion = async requestBody => {
    try {
        return (await axios.post(`${API_ROOT}/questions`, requestBody)).data.body
    } catch (error) {
        throw new Error(error);
    }
}
