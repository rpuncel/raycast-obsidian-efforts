import { Form, ActionPanel, Action } from "@raycast/api";
import { intensities } from "../globals";

export function NewEffortForm() {
  const intensityItems = intensities.map((intensity) => (
    <Form.Dropdown.Item key={intensity.name} value={intensity.name} title={intensity.name} />
  ));
  return (
    <Form
      navigationTitle="Create a new effort"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit New Effort" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="intensity" title="Intensity">
        {intensityItems}
      </Form.Dropdown>
    </Form>
  );
}
