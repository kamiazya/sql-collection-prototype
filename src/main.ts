import { parse } from './parser';
const filePath = `${__dirname}/../examples/GetUserById.md`;

console.log(parse(filePath));
