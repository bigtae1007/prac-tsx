import React from "react";
import { useWord } from "./useWordQuery";

interface Props {
  id: string;
}
export default function WordsDelete({ id }: Props) {
  const { mutate } = useWord.useDeleteWrod();
  const deleteWord = () => {
    mutate(id);
  };
  return <button onClick={deleteWord}>삭제</button>;
}
