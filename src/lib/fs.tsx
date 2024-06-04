import fs from "fs";
import path from "path";
import { Effort, intensities } from "..";

export function writeEffort(title: string, intensity: string, pathStr: string) {
  const filePath = path.join(pathStr, intensity, `${title}.md`);

  fs.writeFileSync(filePath, "");
  return filePath;
}

export function getDirectories(pathStr: string) {
  const efforts = new Map<string, Effort[]>();
  intensities
    .map((intensity) => intensity.name)
    .forEach((intensity) => {
      const dir = path.join(pathStr, intensity);
      console.log("looking in dir: ", dir);
      const files = fs
        .readdirSync(dir)
        .filter(function (file) {
          const isFile = fs.statSync(path.join(dir, file)).isFile();
          console.log(`file: ${file} isFile: ${isFile}`);
          return isFile && file.endsWith(".md");
        })
        .map((file) => {
          return { title: file, intensity: intensity, path: path.join(dir, file) };
        });
      efforts.set(intensity, files);
    });
  return efforts;
}
