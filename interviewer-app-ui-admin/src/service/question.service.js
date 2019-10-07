import axios from "axios";

export const API_ROOT = 'https://dvpw083q5a.execute-api.eu-west-2.amazonaws.com/dev';

export const loadQuestions = async (searchText, searchTags) => {
    return searchQuestions(searchText, searchTags, {loadIndex: true});
}

export const searchQuestions = async (searchText, tags, inputPayload) => {
    const payload = inputPayload || {};

    if (tags) {
        payload.tags = tags;
    }

    if (searchText) {
        payload.search = searchText;
    }

    return getQuestion(payload);
}

export const reindexQuestions = async () => {
    return getQuestion(null, "/index");
}

export const commitQuestions = async () => {
    const requestBody = {
        command: "UPLOAD_INDEX",
    }
    return postQuestion(requestBody);
}

export const createQuestion = async ({title, answer, tags}) => {
    return createOrUpdateQuestion({title, answer, tags}, 'CREATE');
}

export const updateQuestion = async ({title, answer, tags, questionId}) => {
    return createOrUpdateQuestion({title, answer, tags, questionId}, 'UPDATE');
}

export const removeQuestion = async (questionId) => {
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


