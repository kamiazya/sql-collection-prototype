import React, { FC, useState } from 'react';
import { createConnection } from "mysql";
import { parse } from "./parser";
import { highlight } from "cli-highlight";
import { render, Box } from "ink";
import Table from "ink-table";
import { Input } from "./Input";

const filePath = `${__dirname}/../examples/GetUserById.md`;

const connection = createConnection({
  host: "localhost",
  database: 'test_database',
  user: "docker",
  password: "docker",
});


connection.config.queryFormat = function (query: string, values: any) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function(text: string, key: string) {
    if (values.hasOwnProperty(key)) {
      return connection.escape(values[key]);
    }
    return text;
  });
};



const Demo: FC<parse.Result<any>> = ({ sqlTemplate }) => {
  const [result, setResult] = useState();
  const onSubmit = (value: string) => {
    connection.query(sqlTemplate!, { id: value }).on('result', (row) => {
      setResult(row);
    });
  };
  return (
    <>
      <Box>
        {highlight(sqlTemplate!, {
          language: "sql"
        })}
      </Box>
      <Input value={"1"} onSubmit={onSubmit}></Input>
      {result ? <Table data={[result]} /> : <></>}
    </>
  );
};


const result = parse(filePath);
render(<Demo {...result}/>, process.stdout);
