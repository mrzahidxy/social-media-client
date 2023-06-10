const Message = ({ message, own }) => {
  const dateTime = new Date(message?.createdAt);

  const formattedDateTime = dateTime.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`${own ? "justify-start" : "justify-end"} flex pt-2`}>
      <div className="flex flex-col">
        <span
          className={`${
            own ? "bg-blue-400" : "bg-gray-400"
          }  text-white px-4 py-1 rounded-md`}
        >
          {message?.text}
        </span>
        <span className="text-xs text-gray-400">{formattedDateTime}</span>
      </div>
    </div>
  );
};

export default Message;
