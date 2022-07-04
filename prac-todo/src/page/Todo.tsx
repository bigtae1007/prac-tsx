import React, { useState } from "react";
import styled from "styled-components";
import TodoInput from "../todo/TodoInput";
import TodoText from "../todo/TodoText";

type todo = {
  text: string;
};
export default function Todo() {
  const [inputText, setInputText] = useState<todo>();

  return (
    <WrapTodo>
      <TodoInput changeInput={setInputText} />
      <TodoText />
    </WrapTodo>
  );
}

const WrapTodo = styled.div`
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  padding: 40px 0;
`;
