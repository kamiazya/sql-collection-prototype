import { JSONSchema7Definition } from "json-schema";
import { Node } from "unist";
import unified from "unified";
import markdown from "remark-parse";
import fs from "fs";
import YAML from "yaml";
const frontmatter = require("remark-frontmatter");
const parseYaml = require("remark-parse-yaml");
const find = require("unist-util-find");

type Selector = (node: Node) => boolean;

interface CustomNode<T = any> {
  selector: Selector;
  getData: (node: Node) => T;
}

const Metadata: CustomNode = {
  selector: ({ type }: Node) => type === "meta",
  getData: ({ data }: Node) => data
};

const SqlTemplate: CustomNode = {
  selector: ({ type, meta, lang }: Node) =>
    type === "code" && meta === "template" && lang === "sql",
  getData: ({ value }: Node) => value
};

const OutputSchema: CustomNode<JSONSchema7Definition> = {
  selector: ({ type, meta, lang }: Node) =>
    type === "code" &&
    meta === "output-schema" &&
    ["yaml", "yml"].includes(lang as string),
  getData: ({ value }: Node) => YAML.parse(value as string)
};

const InputSchema: CustomNode<JSONSchema7Definition> = {
  selector: ({ type, meta, lang }: Node) =>
    type === "code" &&
    meta === "input-schema" &&
    ["yaml", "yml"].includes(lang as string),
  getData: ({ value }: Node) => YAML.parse(value as string)
};

export function parse<M = any>(filePath: string): parse.Result<M> {
  const file = fs.readFileSync(filePath);
  const result: parse.Result<M> = {};
  const processor = unified()
    .use(markdown)
    .use(frontmatter)
    .use(parseYaml)
    // .use(heading)
    .use(() => {
      return (tree: Node) => {
        const metadataNode = find(tree, Metadata.selector);
        if (metadataNode) {
          result.metadata = Metadata.getData(metadataNode);
        }

        const sqlTemplateNode = find(tree, SqlTemplate.selector);
        if (sqlTemplateNode) {
          result.sqlTemplate = SqlTemplate.getData(sqlTemplateNode);
        }

        const outputSchemaNode = find(tree, OutputSchema.selector);
        if (outputSchemaNode) {
          result.inputSchema = OutputSchema.getData(outputSchemaNode);
        }

        const inputSchemaNode = find(tree, InputSchema.selector);
        if (inputSchemaNode) {
          result.outputSchema = InputSchema.getData(inputSchemaNode);
        }
      };
    });
  const parsed = processor.parse(file);
  processor.runSync(parsed);
  return result;
}

export namespace parse {
  export interface Result<M> {
    metadata?: M;
    sqlTemplate?: string;
    inputSchema?: JSONSchema7Definition;
    outputSchema?: JSONSchema7Definition;
  }
}
