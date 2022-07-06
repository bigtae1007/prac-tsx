import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useMutation } from "react-query";

interface data {
  word: string;
  example: string;
  mean: string;
}

export const useWord = {
  useSaveWord: () => {
    const fetech = async (payload: data) => {
      await addDoc(collection(db, "words"), payload);
    };
    return useMutation(fetech, {
      onSuccess: () => {
        alert("저장 완료");
      },
      onError: () => {
        alert("저장 실패 ");
      },
    });
  },
};
