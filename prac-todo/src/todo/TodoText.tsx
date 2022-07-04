import { collection, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { useQuery } from "react-query";
import { db } from "../firebase/firebase";
import TodoDelete from "./TodoDelete";

interface Data {
  id: string;
  text?: string;
}

export default function TodoText() {
  const arr: string[] = ["111", "2222", "333"];

  const fetcher = async () => {
    const todos_data = await getDocs(collection(db, "todos"));
    const todos_list: Data[] = [];
    todos_data.forEach((doc) => {
      todos_list.push({ id: doc.id, ...doc.data() });
    });
    return todos_list;
  };
  const { data, isLoading, isError } = useQuery("todos", fetcher, {
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {data &&
        data.map((v, l) => {
          return (
            <>
              <p key={v.id}>{v.text}</p>
              <TodoDelete id={v.id} />
            </>
          );
        })}
    </div>
  );
}
