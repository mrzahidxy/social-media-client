import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { privateRequest } from "../../utils/requestMethod";

const OnlineUser = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [friend, setFriend] = useState(null);

  const getFriendDetails = async () => {
    const friendId = user?.userId;

    if (friendId) {
      try {
        const res = await privateRequest.get(`/users/find?userId=${friendId}`);
        setFriend(res.data);
      } catch (error) {
        console.error("Friend", error);
      }
    }
  };

  useEffect(() => {
    getFriendDetails();
  }, [user, currentUser]);

  return (
    <div
      className="flex flex-row items-center gap-5 relative"
      key={Math.random()}
    >
      <img
        src="https://picsum.photos/id/14/50"
        alt=""
        className="rounded-full relative"
      />
      <div className="w-2 h-2 rounded-full bg-green-600 absolute top-0 left-0"></div>
      <span className="text-l font-semibold text-gray-800">
        {friend?.username}
      </span>
    </div>
  );
};

export default OnlineUser;
