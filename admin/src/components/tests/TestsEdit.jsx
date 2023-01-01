import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const TestsEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth disabled source="name" />
        <DateInput helperText={false} disabled source="testDate" />
        <TextInput fullWidth source="testTime" />
        <TextInput fullWidth source="result" />   
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default TestsEdit;