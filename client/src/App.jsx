import React, { useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [value, setValue] = useState("");

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const postData = (data) => {
    fetch("http://localhost:9000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  };

  const handleOnInputChanged = (e) => {
    setValue(e.target.value);

    debounce(() => {
      postData(e.target.value);
    }, 1000)();
  };

  return (
    <div className="flex h-[96vh] gap-6">
      {/*text input area container */}
      <div className="flex-grow h-full w-full">
        <textarea
          className="h-full w-full p-2 border-none border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
          name="input-area"
          id="text-area"
          cols="30"
          rows="10"
          placeholder="Paste your swagger here. only paste json."
          value={value}
          onChange={handleOnInputChanged}
        ></textarea>
      </div>

      {/* swagger output container */}
      <div className="flex-grow h-full w-full rounded-md p-2 bg-slate-300">
        {/* <span>swagger container</span> */}
        <iframe
          src="http://localhost:9000/index.html"
          frameBorder="0"
          height="100%"
          width="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
