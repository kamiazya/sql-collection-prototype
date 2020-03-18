import {Command, flags} from '@oclif/command'
import * as path from 'path';
import { createElement } from 'react';
import { render } from "ink";
import { parse } from "@sql-collection-prototype/md-parser";
import { App } from '@sql-collection-prototype/terminal';

export default class CUI extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ sql-collection-prototype cui
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  };

  static args = [{
    name: 'file',
    required: true,
    parse(filePath: string) {
      if (path.isAbsolute(filePath)) {
        return filePath;
      }
      return path.resolve(process.cwd(), filePath);
    },
  }];

  async run() {
    const { args } = this.parse(CUI);
    const filePath: string = args.file;
    const result = parse(filePath);
    render(createElement(App, result), process.stdout);
  }
}
