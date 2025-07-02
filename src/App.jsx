import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    // console.log(dataString);
    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);
  };
  // console.log(result);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800"></div>
      <div className="col-span-4 p-10">
        <div className="container h-140 overflow-scroll">
          <div className="text-zinc-300">
            <ul>
              {result.map((item, index) => (
                <div key={index + Math.random()} className={item.type == "q" ? "flex justify-end" : ""}>
                  {item.type == "q" ? (
                    <li
                      key={index + Math.random()}
                      className="text-right border-8 bg-zinc-700 b border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit p-1"
                    >
                      <Answer ans={item.text} totalResult={1} index={index} type={item.type} />
                    </li>
                  ) : (
                    item.text.map((ansItem, ansIndex) => (
                      <li
                        key={ansIndex + Math.random()}
                        className="text-left p-1"
                      >
                        <Answer
                          ans={ansItem}
                          totalResult={item.length}
                          index={ansIndex}
                          type={item.type}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border border-zinc-700 flex h-16 p-1 pr-5">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me Anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
