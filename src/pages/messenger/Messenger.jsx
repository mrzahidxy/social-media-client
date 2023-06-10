import { useContext, useEffect, useRef, useState } from "react";
import Conversations from "../../components/messenger/Conversations";
import Message from "../../components/messenger/Message";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "react-query";
import messengerServices from "../../services/messengerSrvices";
import { privateRequest } from "../../utils/requestMethod";

const Messenger = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [messageByUser, setMessageByUser] = useState("");

  // FETCHING CONVERSATION
  const { data, error, loading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => messengerServices.fetchconversationsByUser(currentUser?._id),
  });

  // Serach FRIEND
  const serachFriend = async () => {
    try {
      const res = await privateRequest.get(
        `/users/find?username=${searchQuery}`
      );
      setSearchResults(res.data);
    } catch (error) {
      console.log("Find Friemd ::: >>>", error);
    }
  };

  // CRAETE CONVERSATION
  const createConversation = async () => {
    try {
      await privateRequest.post(`/conversations/`, {
        senderId: currentUser?._id,
        receiverId: searchResults?._id,
      });
    } catch (error) {
      console.log("create conversations ::: >>>", error);
    }
  };

  // FETCHING MESSEGE
  const getMessageByConversation = async () => {
    try {
      const res = await privateRequest.get(`/message/${conversationId}`);
      setMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessageByConversation();
  }, [conversationId]);

  // SENT MESSAGE
  const sentMessage = async () => {
    try {
      await privateRequest.post("/message/", {
        conversationId: conversationId,
        sender: currentUser._id,
        text: messageByUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(messageByUser);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-4 pl-4 hidden md:block">
        <div className="flex flex-col gap-5 group relative">
          <div className="flex flex-row gap-5 items-center">
            <img
              src="https://picsum.photos/id/14/50"
              alt=""
              className="rounded-full"
            />
            <span className="text-xl font-semibold text-gray-800">
              {currentUser?.username}
            </span>
          </div>

          <div
            className="bg-blue-400 text-white text-sm top-10 left-3 text-center rounded-md p-2 cursor-pointer hidden group-hover:block absolute transition-opacity ease-in-out duration-100"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              className="w-full h-12 pl-4 rounded-l-lg border focus:outline-blue-200"
              placeholder="Search your friend..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-blue-400 text-white px-4 rounded-r-lg"
              onClick={serachFriend}
            >
              Search
            </button>
          </div>
          {searchResults ? (
            <div
              key={searchResults._id}
              className="text-semibold"
              onClick={() => createConversation()}
            >
              {searchResults.username}
            </div>
          ) : (
            "Not Found"
          )}
        </div>
        <div className="space-y-1">
          {data
            ? data?.data?.map((conversation) => (
                <div
                  onClick={() => setConversationId(conversation?._id)}
                  key={conversation._id}
                >
                  <Conversations conversation={conversation} />
                </div>
              ))
            : "Loading....."}
        </div>
      </div>
      <div className="px-2 w-full flex flex-col h-full">
        <div className="flex flex-row items-center gap-5">
          <img
            src="https://picsum.photos/id/14/50"
            alt=""
            className="rounded-full"
          />
          <span className="text-l font-semibold text-gray-800">
            Zahid Hasan
          </span>
        </div>
        <>
          <div className="flex flex-col gap-2">
            {message.length > 0 ? (
              message.map((m) => (
                <Message
                  message={m}
                  own={m.sender === currentUser._id}
                  key={m._id}
                />
              ))
            ) : (
              <div className="text-center font-bold text-gray-400">
                Start a conversation
              </div>
            )}
          </div>
          <div className="flex flex-row mt-auto">
            <textarea
              className="w-full border focus:outline-blue-200"
              onChange={(e) => setMessageByUser(e.target.value)}
            />
            <button
              className="bg-blue-400 text-white px-4 rounded-r-lg"
              onClick={() => sentMessage()}
            >
              Send
            </button>
          </div>
        </>
      </div>
      <div className="space-y-2 hidden lg:block">
        <div className="flex flex-row items-center gap-5">
          <img
            src="https://picsum.photos/id/14/50"
            alt=""
            className="rounded-full"
          />
          <span className="text-l font-semibold text-gray-800">
            Zahid Hasan
          </span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <img
            src="https://picsum.photos/id/14/50"
            alt=""
            className="rounded-full"
          />
          <span className="text-l font-semibold text-gray-800">
            Zahid Hasan
          </span>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
