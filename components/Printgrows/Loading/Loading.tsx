const Loading = () => {
  return (
    <div className=" flex justify-center gap-3 items-center h-full">
      <span className="bg-indigo-700 w-4 h-4 rounded-full opacity-30 animate-bounce shadow-md"></span>
      <span
        className="bg-indigo-700 w-4 h-4 rounded-full opacity-30 animate-bounce shadow-md"
        style={{
          animationDelay: "150ms",
        }}
      ></span>
      <span
        className="bg-indigo-700 w-4 h-4 rounded-full opacity-30 animate-bounce shadow-md"
        style={{
          animationDelay: "300ms",
        }}
      ></span>
    </div>
  );
};

export default Loading;
