import { privateRequest } from "../utils/requestMethod";

const fetchconversationsByUser = (id) => {
  return privateRequest.get(`/conversations/${id}`);
};

const messengerServices = { fetchconversationsByUser };
export default messengerServices;
