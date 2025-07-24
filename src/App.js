import React, { useEffect, useState, useRef } from "react";

//components - use these!
import {
  OptionsGrid,
  Header,
  Timer,
  QuestionPane,
  NavigationButtons,
  QuestionPanel,
} from "./components";

//utils - use this!
import { fetchQuestion } from "./fetchQuestion";

/**
 * How to read from localStorage -> localStorage.getItem(<key>);
 * How to write into localStorage -> localStorage.setItem(<key>, <string>);
 * Hint: To write an object into localStorage, stringify it.
 */
// 🚨 Important: use this key to read/write data from localStorage - it will be used in test cases as well.
const LOCAL_STORAGE_KEY = "would_you_rather_votes";

export default function App({ maxTimePerQuestion = 5 /* seconds */ }) {
  // Implement me! You are given a skeleton and its your
  // job to fill it up with 💡 missing props and handlers!
  // (no more components need to be added or the structure changed)
  const [loading, setLoading] = useState(true);
  const [currIndex, setCurrIndex] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(null);

  useEffect(() => {
    async function fetchAndUpdate() {
      setLoading(true);
      // const currDataInLocalString = localStorage.getItem(LOCAL_STORAGE_KEY);
      // const currDataJson = JSON.parse(currDataInLocalString);
      // if (currDataJson && currIndex >= 0 && currIndex < currDataJson.length) {
      //   setCurrQuestion(currDataJson[currIndex]);
      //   setLoading(false);
      //   return;
      // }
      const res = await fetchQuestion(currIndex);
      setCurrQuestion(res);
      setLoading(false);
    }

    fetchAndUpdate();
  }, [currIndex]);

  const onSelect = (index) => {
    const currDataInLocalString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currDataJson =
      !currDataInLocalString || currDataInLocalString.length === 0
        ? []
        : JSON.parse(currDataInLocalString);
    currDataJson.push({
      questionId: currIndex,
      selectedId: index,
      skipped: false,
      ...currQuestion,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currDataJson));
    setCurrQuestion(currDataJson[currIndex]);
  };

  const onNext = () => {
    setCurrIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };

  const onPrev = () => {
    setCurrIndex((prevIndex) => {
      return prevIndex - 1;
    });
  };

  const onExpire = () => {
    const currDataInLocalString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currDataJson =
      !currDataInLocalString || currDataInLocalString.length == 0
        ? []
        : JSON.parse(currDataInLocalString);
    currDataJson.push({
      questionId: currIndex,
      selectedId: undefined,
      skipped: true,
      ...currQuestion,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currDataJson));
    setCurrQuestion(currDataJson[currIndex]);
  };
  return (
    <div className="p-4 font-sans max-w-xl mx-auto">
      <Header />
      <QuestionPanel loading={loading}>
        <Timer
          duration={maxTimePerQuestion}
          onExpire={onExpire}
          disabled={currQuestion.skipped}
        />
      </QuestionPanel>
      {loading ? (
        <div className="text-center text-gray-500 mb-6">
          Loading next question...
        </div>
      ) : (
        <OptionsGrid
          options={currQuestion.options}
          onSelect={onSelect}
          selected={currQuestion.selectedId ?? null}
          skipped={currQuestion.skipped ?? null}
        />
      )}
      <NavigationButtons
        total={5}
        onNext={onNext}
        onPrev={onPrev}
        index={currIndex}
      />
    </div>
  );
}
