import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const fileToOverwrite = resolve(
  "./node_modules/react-docgen-typescript/lib/parser.js"
);

const file = "./scripts/_parser.js";

const fOrigi = readFileSync(fileToOverwrite);
const fTo = readFileSync(file);

writeFileSync(fileToOverwrite, fTo);
