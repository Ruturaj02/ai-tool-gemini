import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";

const Answer = ({ ans,totalResult, index ,type}) => {
  // console.log(index);
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    // console.log(ans);
    // console.log(checkHeading(ans));
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans));
    }
  }, []);

  return (
    <>
      {index==0 && totalResult > 1? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : (
        <span className={type=="q" ? 'pl-1' : 'pl-5'}>{answer}</span>
      )}
    </>
  );
};

export default Answer;
