import { toString, toDataURL, toFile } from "qrcode";

export const generateQR = async (text) => {
  try {
    console.log(await toString(text, { type: "terminal" }));
  } catch (err) {
    console.log(err);
  }
};

export const generateQRFile = async (text) => {
  try {
    await toFile(`${text}.png`, text);
  } catch (err) {
    console.log(err);
  }
};

export const generateQRURL = async (text) => {
  try {
    console.log(await toDataURL(text));
  } catch (err) {
    console.log(err);
  }
};
