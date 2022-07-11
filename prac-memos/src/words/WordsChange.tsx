import React from "react";
import { useEffect } from "react";

interface Data {
  example?: string;
  id?: string;
  mean?: string;
  word?: string;
}

interface Props {
  id: Data;
  togle: React.Dispatch<React.SetStateAction<boolean>>;
  state: React.Dispatch<React.SetStateAction<boolean>>;
  change: React.Dispatch<React.SetStateAction<{}>>;
}
export default function WordsChange({ id, togle, state, change }: Props) {
  const dataChange = () => {
    change({
      example: id.example,
      id: id.id,
      mean: id.mean,
      word: id.word,
    });
    state(true);
    togle(true);
  };

  return <button onClick={dataChange}>수정</button>;
}
