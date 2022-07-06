import React, { useState, Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { useWord } from "./useWordQuery";

interface dataType {
  word?: string;
  mean?: string;
}

export default function WordsInput({
  togle,
}: {
  togle: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate } = useWord.useSaveWord();
  const [data, setData] = useState<dataType | null>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  return (
    <BackGround>
      <Toggle>
        <WrapInput>
          <div>
            단어
            <input type="text" id="word" onChange={dataChange} />
          </div>
          <div>
            단어 뜻
            <input type="text" id="mean" onChange={dataChange} />
          </div>
          <div>
            예문
            <textarea id="example" ref={text} />
          </div>
        </WrapInput>

        <button
          onClick={() => {
            if (
              data?.word !== undefined &&
              data?.mean !== undefined &&
              text.current?.value !== undefined
            )
              mutate({
                word: data.word,
                mean: data.mean,
                example: text.current?.value,
              });
            togle(false);
          }}
        >
          단어 저장
        </button>
        <button
          onClick={() => {
            togle(false);
          }}
        >
          취소
        </button>
      </Toggle>
    </BackGround>
  );
}
const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Toggle = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-250px, -250px);
  border: 1px solid #000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  flex-wrap: wrap;
  div {
    display: flex;
    justify-content: center;
    gap: 20px;
    textarea {
      resize: none;
      height: 100px;
    }
  }
`;
