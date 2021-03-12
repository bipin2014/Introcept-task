import { GetRequest, PostRequest } from "../../../../plugins/axios";
import { Client } from '../model/Client';

export const getAllClients = () => {
    return GetRequest(`${process.env.REACT_APP_API_BASE_URL}/clients`, {}, {});
};

export const addNewClient = (payload: Client = {}) => {
    return PostRequest(`${process.env.REACT_APP_API_BASE_URL}/clients`, payload, {});
};
