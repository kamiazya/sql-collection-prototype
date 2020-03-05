import React, { FC } from 'react';
import { parse } from "./parser";
import { highlight } from "cli-highlight";
import { render, Box } from "ink";
import { Input } from "./Input";

const filePath = `${__dirname}/../examples/GetUserById.md`;


const Demo: FC<parse.Result<any>> = ({ sqlTemplate }) => {
  const onSubmit = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <Box>
        {highlight(sqlTemplate!, {
          language: "sql"
        })}
      </Box>
      <Input value={"1"} onSubmit={onSubmit}></Input>
    </>
  );
};


const result = parse(filePath);
render(<Demo {...result}/>, process.stdout);
