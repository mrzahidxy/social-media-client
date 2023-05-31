const Conversations = () => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-md px-4 py-2 hover:shadow-lg cursor-pointer">
      <div className="flex justify-between">
        <span className="font-semibold text-lg text-gray-800">
          Mehedi Hasan
        </span>
        <span className="text-xs text-gray-400">3.20 PM</span>
      </div>
      <span className="text-gray-600">How are you?</span>
    </div>
  );
};

export default Conversations;
