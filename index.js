#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

let url = "";
console.log(`${chalk.inverse("Welcome to Uther!")}`);

async function getWebsite() {
  const website = await inquirer.prompt({
    name: "url",
    type: "input",
    message: `${chalk.inverse("Enter Website:")}`,
    default() {
      return "www.google.com";
    },
  });
  url = website.url;
}

console.clear();
await getWebsite();
