import { useState } from "react";

function Example() {
  // let num = 0;
  const [num, setNum] = useState(0);

  increaseNum = () => {
    // num = num +1;
    setNum(num + 1);
  };

  return <div onClick={increaseNum()}>{num}</div>;
}
export default Example;
