#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { toString, toDataURL, toFile } from "qrcode";
import { createSpinner } from "nanospinner";
import validUrl from "valid-url";

let url = "";
let mode = 0;

const intro = () => {
  console.log(`${chalk.inverse("Welcome to Uther!")}`);
};

async function getWebsite() {
  const website = await inquirer.prompt({
    name: "url",
    type: "input",
    message: `${chalk.inverse("Enter Website:")}`,
    default() {
      return "https://www.google.com/";
    },
  });
  // check if url is genuine or not
  if (!validUrl.isWebUri(website.url)) {
    console.log(`${chalk.red("Invalid Web URL!!")}`);
    process.exit(1);
  }
  url = website.url;
}

const modeOfQR = async () => {
  const method = await inquirer.prompt({
    name: "type",
    type: "list",
    message: "Type of QR Generation\n",
    choices: [
      "Generate QR in Terminal",
      "Generate QR as a File",
      "Generate QR as a Base64 Data URI",
    ],
  });
  if (method.type == "Generate QR in Terminal") mode = 1;
  else if (method.type == "Generate QR as a File") mode = 2;
  else mode = 3;

  return mode;
};

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const spinner = async () => {
  const spinner = createSpinner("Generating...").start();
  await sleep();
  if (mode != 0) {
    spinner.success({ text: "Done!" });
  } else {
    spinner.error({ text: "Error" });
    process.exit(1);
  }
};

const generateQRString = async (text) => {
  try {
    console.log(await toString(text, { type: "terminal" }));
  } catch (err) {
    console.log(err);
  }
};

const generateQRFile = async (text) => {
  try {
    await toFile(`./qr.png`, text);
  } catch (err) {
    console.log(err);
  }
};

const generateQRURL = async (text) => {
  try {
    console.log(await toDataURL(text));
  } catch (err) {
    console.log(err);
  }
};

const generateQR = async () => {
  await spinner();
  if (mode == 1) {
    await generateQRString(url);
  } else if (mode == 2) {
    await generateQRFile(url);
  } else if (mode == 3) {
    await generateQRURL(url);
  } else {
    console.log(`${chalk.red("Error!!")}`);
    process.exit(1);
  }
};

console.clear();
intro();
await getWebsite();
await modeOfQR();
await generateQR();
