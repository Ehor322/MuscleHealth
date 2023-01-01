import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const ReportsEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth disabled source="userName" />
        <DateInput helperText={false} disabled source="reportDate" />
        <TextInput fullWidth source="result" />
        <TextInput fullWidth source="typeOfPain" />   
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default ReportsEdit;