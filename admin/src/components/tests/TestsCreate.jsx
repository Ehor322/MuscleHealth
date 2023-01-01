import React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  FileInput,
  FileField
} from "react-admin";
import { usePermissions } from "react-admin";

const TestsCreate = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Create>
      <TabbedForm>
        <FormTab label="test create" sx={{ maxWidth: "40em" }}>
          <TextInput sortable={false} source="name" />
          <DateInput sortable={false} source="testDate" />
          <NumberInput sortable={false} source="testTime" InputProps={{ inputProps: { min: 0, max: 20 } }} />
          <TextInput sortable={false} source="result" />
          <ReferenceInput label="user" source="user_id._id" reference="user">
            <SelectInput optionText="id" />
          </ReferenceInput>
          <FileInput source="files" label="Related files" accept="application/json">
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>
      </TabbedForm>
    </Create>
  ) : (
    <div>No access</div>
  );
};
export default TestsCreate;