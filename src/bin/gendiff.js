#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

const program = new commander.Command();
program.version('1.0.0');
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format [type]', 'output format');
program.arguments('<firstConfig> <secondConfig>');
program.action((firstConfig, secondConfig) => {
  console.log(genDiff(firstConfig, secondConfig));
});
program.parse(process.argv);
