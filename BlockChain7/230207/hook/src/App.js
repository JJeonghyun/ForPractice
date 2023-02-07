import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("최초 rendering 완료");
  }, []);
  useEffect(() => {
    console.log("rendering 발생");
  });

  useEffect(() => {
    console.log("count가 변화했습니다.");
  }, [count]);
  return (
    <div>
      <div>현재 count : {count} </div>
      <div>
        <button
          onClick={() => {
            setCount((state) => state + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setCount((state) => state - 1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default App;
