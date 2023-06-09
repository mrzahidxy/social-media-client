const Message = ({}) => {
  return (
    <div className="flex flex-col gap-2 pt-2 px-2 bg-gray-100 pb-12">
      {[1, 2, 3, 4, 5].map((c) => (
        <div key={c}>
          <div className="flex justify-end">
            <span className="bg-blue-400 text-white px-4 py-1 rounded-md">
              Fine, you?
            </span>
          </div>
          <div className="flex justify-start">
            <span className="bg-white px-4 py-1 rounded-md">
              Hi, How are you?
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
