import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface data {
  word: string;
  example: string;
  mean: string;
}
// 우선  ?:를 통해 typeerror는 넘어가보자
interface wordList {
  id: string;
  word?: string;
  example?: string;
  mean?: string;
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
  useGetWord: () => {
    const fetech = async () => {
      const wordsData = await getDocs(collection(db, "words"));
      const wordsList: wordList[] = [];
      wordsData.forEach((doc) => {
        wordsList.push({ id: doc.id, ...doc.data() });
      });
      return wordsList;
    };
    return useQuery("words", fetech);
  },
  useDeleteWrod: () => {
    const queryClient = useQueryClient();
    const fetch = async (id: string) => {
      const docRef = doc(db, "words", id);
      await deleteDoc(docRef);
    };
    return useMutation(fetch, {
      onSuccess: () => {
        console.log("aa");
        queryClient.invalidateQueries("words");
      },
    });
  },
};
