import { parse } from './parser';
import { highlight } from "cli-highlight";

const filePath = `${__dirname}/../examples/GetUserById.md`;

const result = parse(filePath);
console.log(
  highlight(result.sqlTemplate!, {
    language: "sql"
  })
);
