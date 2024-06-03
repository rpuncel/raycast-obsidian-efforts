import { ActionPanel, List, Action, getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";
import { NewEffortForm } from "./components/NewEffortForm";
import { getDirectories } from "./lib/getDirectories";

export interface Effort {
  title: string;
  path: string;
  intensity: string;
}

interface Preferences {
  effortsFolder: string;
}

export const intensities = [
  {
    name: "On",
    icon: "🔥",
  },
  {
    name: "Ongoing",
    icon: "♻️",
  },
  {
    name: "Simmering",
    icon: "〰︎",
  },
];

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const [efforts, setEfforts] = useState<Map<string, Effort[]>>();

  useEffect(() => {
    const efforts = getDirectories(preferences.effortsFolder);
    setEfforts(efforts);
  }, []);

  return (
    <List isLoading={efforts === undefined}>
      {intensities.map((intensity) => (
        <List.Section title={`${intensity.icon} ${intensity.name}`}>
          {efforts?.get(intensity.name)?.map((effort, index) => (
            <List.Item
              key={index}
              title={effort.title}
              actions={
                <ActionPanel>
                  <Action.Open title="Open in Obsidian" target={`obsidian://open?path=${effort.path}`} />
                  <Action.Push title="Create New Effort" target={<NewEffortForm />} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
