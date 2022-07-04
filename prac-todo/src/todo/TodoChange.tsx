import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../firebase/firebase";

export default function TodoChange({ id }: { id: string }) {
  const [textCheck, setTextCheck] = useState(false);
  const [inputText, setInputText] = useState("");

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const fetcher = async (id: string) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      text: inputText,
    });
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const changeTodos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText("");
    setTextCheck(false);
    mutate(id);
  };
  return (
    <div>
      <button
        onClick={() => {
          setTextCheck(!textCheck);
        }}
      >
        수정
      </button>
      {textCheck && (
        <form onSubmit={changeTodos}>
          {" "}
          <input type="text" value={inputText} onChange={changeInput} />
        </form>
      )}
    </div>
  );
}
