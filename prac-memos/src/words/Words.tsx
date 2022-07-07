import React, { useState } from "react";
import styled from "styled-components";
import { useWord } from "./useWordQuery";
import WordsDelete from "./WordsDelete";
import WordsInput from "./WordsInput";

export default function Words() {
  const [toggleState, setToggleState] = useState(false);

  const { data = [] } = useWord.useGetWord();
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
            <WrapWord>
              <div style={{ border: "1px solid #000" }} key={v.id}>
                <p>{v.word}</p>
                <p>{v.mean}</p>
                <pre>{v.example}</pre>
              </div>
              <div>
                <button>수정</button>
                <WordsDelete id={v.id} />
              </div>
            </WrapWord>
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

const WrapWord = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  div {
    width: 50%;
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    width: 100px;
  }
`;
