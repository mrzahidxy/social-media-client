import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { privateRequest } from "../../utils/requestMethod";

const Conversations = ({ conversation}) => {
  const { currentUser } = useContext(AuthContext);
  const [friend, setFriend] = useState(null);

  const getFriendDetails = async () => {
    const friendId = conversation?.members?.find((m) => m !== currentUser._id);

    if (friendId) {
      try {
        const res = await privateRequest.get(`/users/find?userId=${friendId}`);
        setFriend(res.data);
      } catch (error) {
        console.error("getOtherUser", error);
      }
    }
  };

  useEffect(() => {
    getFriendDetails();
  }, [conversation, currentUser]);

  return (
    <div className="flex flex-col bg-gray-100 rounded-md px-4 py-2 hover:shadow-lg cursor-pointer">
      <div className="flex justify-between">
        <span className="font-semibold text-lg text-gray-800">
          {friend?.username}
        </span>
        <span className="text-xs text-gray-400">{conversation?.updatedAt}</span>
      </div>
      <span className="text-gray-600">How are you?</span>
    </div>
  );
};

export default Conversations;
