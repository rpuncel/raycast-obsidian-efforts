import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import fs from 'fs';
import path from 'path';

interface Effort {
  title: string;
  path: string;
  intensity: string;
}

const intensities = ["On", "Ongoing", "Simmering"]

function getDirectories(pathStr: string) {
  const efforts = new Map<string, Effort[]>()
  intensities.forEach((intensity) => {
    const dir = path.join(pathStr, intensity)
    console.log("looking in dir: ", dir)
    const files = fs.readdirSync(dir).filter(function (file) {
      const isFile = fs.statSync(path.join(dir, file)).isFile();
      console.log(`file: ${file} isFile: ${isFile}`)
      return isFile && file.endsWith('.md');
      }).map((file) => {
        return { title: file, intensity: intensity, path: path.join(dir, file) }
      });
    efforts.set(intensity, files)
  });
  return efforts
     
}

const EFFORTS_DIR = '/Users/rpuncel/Documents/Personal/Efforts'
export default function Command() {
  const [ efforts, setEfforts ] = useState<Map<string, Effort[]>>();

  useEffect(() => {
    const efforts = getDirectories(EFFORTS_DIR)
    setEfforts(efforts)
  }, []);

  return (
    <List isLoading={efforts === undefined}>
      {intensities.map((intensity) => (
        <List.Section title={intensity}>
          {efforts?.get(intensity)?.map((effort, index) => (
            <List.Item
              key={index}
              title={effort.title} 
              actions={
                <ActionPanel>
                  <Action.Open title="Open in Obsidian" target={`obsidian://open?path=${effort.path}`}/>
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    
    </List>
  );
}
