import { Node } from "unist";
import unified from "unified";
import remark from "remark";
import markdown from "remark-parse";
import remarkStringify from "remark-stringify";
import inspect from 'unist-util-inspect';
import fs from 'fs';
const u = require("unist-builder");
// import util from 'util';
// const frontmatter = require('remark-frontmatter')
// const metadata = require('remark-meta');
// const heading = require('hast-util-heading');
const frontmatter = require('remark-frontmatter');
const parseYaml = require('remark-parse-yaml');
// const heading = require("mdast-util-heading-range");

// const sectionize = require('remark-sectionize');
const find = require('unist-util-find');

const processor = unified()
  .use(markdown)
  .use(frontmatter)
  .use(parseYaml)
  // .use(heading)
  .use(() => {
    return (tree: Node) => {
      const metadataNode = find(
        tree,
        (node: Node) => node.type === "yaml"
      );
      const titleNode = find(tree, (node: Node) => (node.type === "heading" && node.depth == 1));
      const a = remark().processSync(titleNode);
      console.log(a);
      // return titleNode;
      // console.log(find(tree, "value"));
      // function condition
      // console.log(
      //   find(tree, function(node: Node) {
      //     return node.type === "inlineCode";
      //   })
      // );
    };
  });

const file = fs.readFileSync(`${__dirname}/../examples/GetUserById.md`)
const parsed = processor.parse(file);
// console.log(inspect(parsed));
const transformed = processor.runSync(parsed);
// console.log(inspect(transformed));

console.log(processor.process(transformed));

// // console.log(util.inspect(parsed, { showHidden: false, depth: null }));
// // console.log(parsed);
// // processor.process(input).then((result) => {
// //   console.log(result);
// // });
