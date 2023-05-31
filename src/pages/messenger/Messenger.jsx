import Conversations from "../../components/messenger/Conversations";
import Message from "../../components/messenger/Message";

const Messenger = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-4 pl-4 hidden md:block">
        <div className="flex flex-row items-center gap-5">
          <img
            src="https://picsum.photos/id/14/50"
            alt=""
            className="rounded-full"
          />
          <span className="text-xl font-semibold text-gray-800">
            Zahid Hasan
          </span>
        </div>
        <div className="flex flex-row">
          <input className="w-full h-8 pl-4 rounded-l-lg border focus:outline-blue-200" />
          <button className="bg-blue-400 text-white px-4 rounded-r-lg">
            Search
          </button>
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((c) => (
            <Conversations key={c} />
          ))}
        </div>
      </div>
      <div className="px-2 w-full">
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
        <Message />
        <div className="flex flex-row">
          <textarea className="w-full border focus:outline-blue-200" />
          <button className="bg-blue-400 text-white px-4 rounded-r-lg">
            Send
          </button>
        </div>
      </div>
      <div className="space-y-2 hidden lg:block">
        {[1, 2, 3, 4, 5].map((u) => (
          <div className="flex flex-row items-center gap-5" key={u}>
            <img
              src="https://picsum.photos/id/14/50"
              alt=""
              className="rounded-full"
            />
            <span className="text-l font-semibold text-gray-800">
              Zahid Hasan
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messenger;
