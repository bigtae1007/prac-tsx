import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import { useMutation, useQueryClient } from "react-query";

export default function TodoInput({ changeInput }: any) {
  const [text, setText] = useState("");

  const fetcher = async (data: string) => {
    await addDoc(collection(db, "todos"), {
      text: data,
    });
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(fetcher, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("todos");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const addText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const addFirebase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(text);
    setText("");
  };
  return (
    <WrapInput>
      <form onSubmit={addFirebase}>
        <input type="text" value={text} onChange={addText} />
      </form>
    </WrapInput>
  );
}

const WrapInput = styled.div`
  display: flex;
  justify-content: center;
`;
