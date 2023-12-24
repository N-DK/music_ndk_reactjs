import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const put = async (path, data = {}) => {
    const response = await request.put(path, data);
    return response.data;
};

export default request;
