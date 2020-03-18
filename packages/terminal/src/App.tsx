import React, { FC, useState } from 'react';
import { createConnection } from "mysql";
import { parse } from "@sql-collection-prototype/md-parser";
import Table from "ink-table";
import { Highlight } from "ink-highlight";
import { Input } from "./Input";


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



export const App: FC<parse.Result<any>> = ({ sqlTemplate }) => {
  const [result, setResult] = useState();
  const onSubmit = (value: string) => {
    connection.query(sqlTemplate!, { id: value }).on('result', (row) => {
      setResult(row);
    });
  };
  return (
    <>
      <Highlight code={sqlTemplate!} language="sql" />
      <Input value={"1"} onSubmit={onSubmit}></Input>
      {result ? <Table data={[result]} /> : <></>}
    </>
  );
};
