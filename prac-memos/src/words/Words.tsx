import React, { useState } from "react";
import styled from "styled-components";
import { useWord } from "./useWordQuery";
import WordsInput from "./WordsInput";

export default function Words() {
  const [toggleState, setToggleState] = useState(false);

  const { data = [] } = useWord.useGetWord();
  console.log(data);
  return (
    <>
      <Wrap>
        <button
          onClick={() => {
            setToggleState(true);
          }}
        >
          메모 작성하기
        </button>
        {toggleState && <WordsInput togle={setToggleState} />}
        {data.map((v) => {
          return (
            <div style={{ border: "1px solid #000" }} key={v.id}>
              <p>{v.word}</p>
              <p>{v.mean}</p>
              <pre>{v.example}</pre>
            </div>
          );
        })}
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  width: 50%;
  border: 1px solid #000;
`;
