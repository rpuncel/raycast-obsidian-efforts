import { Form, ActionPanel, Action } from "@raycast/api";
import { intensities } from "../globals";
import { useState } from "react";

export function NewEffortForm() {
  const [titleError, setTitleError] = useState<string | undefined>();
  function dropTitleErrorIfNeeded() {
    if (titleError && titleError.length > 0) {
      setTitleError(undefined);
    }
  }
  const validateTitle = (title: string | undefined) => {
    console.log(title);
    if (!title || title?.length == 0) {
      setTitleError("The field can't be empty.");
      return;
    }
    dropTitleErrorIfNeeded();
  };

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
      <Form.TextField
        id="title"
        title="Title"
        placeholder="Enter the title of the effort"
        error={titleError}
        onChange={dropTitleErrorIfNeeded}
        onBlur={(event) => validateTitle(event.target.value)}
      />
      <Form.Dropdown id="intensity" title="Intensity">
        {intensityItems}
      </Form.Dropdown>
    </Form>
  );
}
