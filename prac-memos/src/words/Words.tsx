import React, { useState } from "react";
import styled from "styled-components";
import WordsInput from "./WordsInput";

export default function Words() {
  const [toggleState, setToggleState] = useState(false);
  return (
    <Wrap>
      <button
        onClick={() => {
          setToggleState(true);
        }}
      >
        메모 작성하기
      </button>
      {toggleState && <WordsInput togle={setToggleState} />}
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 50%;
  border: 1px solid #000;
`;
