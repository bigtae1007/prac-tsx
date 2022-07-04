import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../firebase/firebase";

export default function TodoDelete({ id }) {
  const fetcher = async (payload) => {
    const docRef = doc(db, "todos", payload);
    await deleteDoc(docRef);
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <button
      onClick={() => {
        mutate(id);
      }}
    >
      삭제
    </button>
  );
}
