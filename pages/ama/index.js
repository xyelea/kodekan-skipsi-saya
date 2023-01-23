import { useEffect, useRef, useState } from "react";
// import ScrollableFeed from "react-scrollable-feed";
import Loader from "../../components/ama/Loader";
/* eslint-disable */
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [inputItems, setInputItems] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [responseData1, setResponseData1] = useState(responseData);
  const [loading, setLoading] = useState(false);

  const resRef = useRef(null);
  const messagesEndRef = useRef(null);

  function typeText(text) {
    let index = -1;

    let interval = setInterval(() => {
      if (index <= text.length + 2) {
        setResponseData((prv) => prv + text.charAt(index));
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;
    const allInputData = {
      id: new Date().getTime().toString(),
      name: inputValue,
      responseData,
    };
    setInputItems([...inputItems, allInputData]);
    setInputValue("");

    setResponseData("");
    setResponseData1("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.result.trim(); // trims any trailing spaces/'\n'
      // console.log("parsedData: ", parsedData);
      // setResponseData(parsedData);
      typeText(parsedData);
      setLoading(false);
    } else {
      const err = await response.text();
      setResponseData("Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    responseData !== "" &&
      setInputItems(
        inputItems.map((inputItem) => {
          setResponseData("");
          if (inputItem.id == resRef?.current?.getAttribute("id")) {
            return { ...inputItem, responseData: responseData1.substring(1) };
          }
          return inputItem;
        })
      );
    setResponseData1((prev) => prev + responseData);
  }, [responseData]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [inputItems, responseData]);

  return (
    <div className="app w-full h-screen bg-[#343541] flex items-center justify-between flex-col">
      {/* Chat Render here */}
      <div className="flex-1 w-full h-full overflow-y-scroll flex flex-col gap-3 pb-5 scroll-smooth">
        {/* <ScrollableFeed> */}
        {inputItems?.map((item) => (
          <div key={item.id}>
            {item.name !== "" && (
              <div className={`w-full p-[15px] ${true && "bg-[#40414f]"}`}>
                <div className="w-full max-w-7xl   mx-auto flex flex-row items-start gap-[10px]">
                  <div className="w-[36px] h-[36px] rounded-md bg-[#5436da] flex justify-center items-center">
                    <img
                      src="assets/bot.svg"
                      alt={`"bot"`}
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="flex-1 text-[#dcdcdc] text-xl max-w-full  whitespace-pre-wrap"
                    id={item.id}
                    ref={resRef}>
                    {item.name}
                  </div>
                </div>
              </div>
            )}
            {/* Loading */}
            <div
              className={`${
                loading == false ? "!hidden" : "last-of-type:!block"
              } hidden w-full max-w-[1280px] mx-auto`}>
              {loading && <Loader loading={loading} />}
            </div>
            {/* render response data here */}
            {item.responseData !== "" && (
              <>
                <div className={`w-full p-[15px]`}>
                  <div className="w-full max-w-[1280px] mx-auto flex flex-row items-start gap-[10px]">
                    <div className="w-[36px] h-[36px] rounded-md bg-[#10a37f] flex justify-center items-center">
                      <img
                        src="assets/user.svg"
                        alt={`${"user"}`}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                    <div
                      className="flex-1 text-[#dcdcdc] text-xl max-w-full  whitespace-pre-wrap"
                      id={item.id}>
                      {item.responseData}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {/* </ScrollableFeed> */}
        {/* Scroll Div */}
      </div>
      {/* from */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1280px] mx-auto p-[10px] rounded-lg bg-[#40414F] flex flex-row gap-3">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full text-[18px] text-white p-[10px] bg-transparent border-none outline-none"
          name="prompt"
          value={inputValue}
          rows="1"
          cols="1"
          placeholder="jangan bingung, kamu ga akan kuat biar aku jawab..."
        />
        <button
          type="submit"
          className="border-none outline-none cursor-pointer bg-transparent">
          <img src="assets/send.svg" alt="send" className="w-[30px] h-[30px]" />
        </button>
      </form>
    </div>
  );
}
