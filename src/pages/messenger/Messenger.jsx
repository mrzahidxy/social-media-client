import { useContext, useEffect, useRef, useState } from "react";
import Conversations from "../../components/messenger/Conversations";
import Message from "../../components/messenger/Message";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "react-query";
import messengerServices from "../../services/messengerSrvices";
import { privateRequest } from "../../utils/requestMethod";
import { io } from "socket.io-client";
import OnlineUser from "../../components/messenger/OnlineUser";

const Messenger = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessgae, setArraivalMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [onlineUser, setOnlineUser] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      setArraivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessgae &&
      conversation?.members.includes(arrivalMessgae?.sender) &&
      setMessages((prev) => [...prev, arrivalMessgae]);
  }, [arrivalMessgae, conversation]);

  console.log(arrivalMessgae);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUser(users);
    });
  }, [currentUser]);

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
      const res = await privateRequest.get(`/message/${conversation?._id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessageByConversation();
  }, [conversation]);

  // SENT MESSAGE
  const sentMessage = async () => {
    const receiverId = conversation?.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await privateRequest.post("/message/", {
        conversationId: conversation?._id,
        sender: currentUser._id,
        text: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // All Friend
  const AllFriend = async () => {
    try {
      const res = await privateRequest.get(`/users/`);
      setUsers(res.data);
    } catch (error) {
      console.log("Friends ::: >>>", error);
    }
  };

  useEffect(() => {
    AllFriend();
  }, []);

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
                  onClick={() => setConversation(conversation)}
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
            {messages.length > 0 ? (
              messages.map((m) => (
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
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              className="bg-blue-400 text-white px-4 rounded-r-lg"
              onClick={sentMessage}
            >
              Send
            </button>
          </div>
        </>
      </div>
      <div className="space-y-2 hidden lg:block">
        {users.length > 0 &&
          onlineUser
            .filter((u) => u._id !== currentUser._id)
            .map((u) => <OnlineUser user={u} key={Math.random()} />)}
      </div>
    </div>
  );
};

export default Messenger;
