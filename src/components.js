import React, { useEffect, useState, useRef } from "react";

export const Header = ({ onClear }) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-xl font-bold">Would You Rather</h1>
    <button
      onClick={onClear}
      className="text-xs px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
    >
      Clear All Votes
    </button>
  </div>
);

export const QuestionPanel = ({ question, loading, children }) => (
  <div className="flex justify-between items-center mb-2">
    <p>{!loading && question?.question}</p>
    {children}
  </div>
);

export const Timer = ({ duration, onExpire, disabled }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    setTime(0);
    intervalRef.current = setInterval(() => {
      setTime((t) => {
        const next = t + 1;
        if (next >= duration) {
          clearInterval(intervalRef.current);
          onExpire?.();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [disabled]);

  if (disabled) return null;
  return (
    <div className="text-sm text-gray-600">
      ⏱ {time} / {duration}
    </div>
  );
};

// Note: "skipped" here indicates user didn't vote timely under 5s and
// we skipped this question for him permanently
export const OptionsGrid = ({ options, onSelect, selected, skipped }) => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    {options.map((opt, i) => {
      const isInactive = (selected != null && selected !== i) || skipped;

      return (
        <div
          key={i}
          onClick={() => onSelect(i)}
          className={`border p-2 rounded cursor-pointer ${
            isInactive ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <img
            src={opt.image}
            alt={opt.label}
            className="w-full h-24 object-cover rounded mb-2"
          />
          <div className="text-center font-semibold">{opt.label}</div>
          {selected === i && (
            <div className="mt-2 text-xs text-center text-blue-600">
              You voted this
            </div>
          )}
          {skipped && (
            <div className="mt-2 text-xs text-center text-red-500">
              Time’s up
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export const NavigationButtons = ({ index, total, onPrev, onNext }) => (
  <div className="flex justify-between">
    <button
      disabled={index === 0}
      onClick={onPrev}
      className="px-3 py-1 border rounded disabled:opacity-40"
    >
      Prev
    </button>
    <button
      disabled={index === total - 1}
      onClick={onNext}
      className="px-3 py-1 border rounded disabled:opacity-40"
    >
      Next
    </button>
  </div>
);
