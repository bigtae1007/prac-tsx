import React, { useState, Dispatch, SetStateAction, useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useWord } from "./useWordQuery";

interface dataType {
  word?: string;
  mean?: string;
}

interface Data {
  example?: string;
  id?: string;
  mean?: string;
  word?: string;
}

export default function WordsInput({
  togle,
  state,
  changeData,
}: {
  togle: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  changeData: Data;
}) {
  // 추가하기query
  const { mutate: add } = useWord.useSaveWord();
  // 수정하기 query
  const { mutate: change } = useWord.useChangeWord();
  // 데이터 상태관리
  const [data, setData] = useState<dataType | null>(null);
  // textarea 상태관리
  const text = useRef<HTMLTextAreaElement>(null);
  // onchange 이벤트
  const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  // 수정하기라면 값 미리 집어넣기
  useEffect(() => {
    if (state) {
      setData({
        word: changeData.word,
        mean: changeData.mean,
      });
    }
  }, []);
  return (
    <BackGround>
      <Toggle>
        <WrapInput>
          <div>
            단어
            <input
              type="text"
              id="word"
              value={data?.word}
              onChange={dataChange}
            />
          </div>
          <div>
            단어 뜻
            <input
              type="text"
              id="mean"
              value={data?.mean}
              onChange={dataChange}
            />
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
              text.current?.value !== undefined &&
              !state
            ) {
              add({
                word: data.word,
                mean: data.mean,
                example: text.current?.value,
              });
              togle(false);
            } else if (
              changeData.id !== undefined &&
              data?.word !== undefined &&
              data?.mean !== undefined &&
              text.current?.value !== undefined &&
              state
            ) {
              change({
                id: changeData.id,
                word: data.word,
                mean: data.mean,
                example: text.current?.value,
              });
              togle(false);
            }
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
