import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const AccountEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth disabled source="email" />
        <TextInput fullWidth disabled source="surname" />
        <TextInput fullWidth disabled source="role" />
        <TextInput fullWidth source="sex" />
        <TextInput fullWidth source="phone" />
        <TextInput fullWidth source="typeOfPain" />   
        <DateInput source="timeToSub" disabled helperText={false} />
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default AccountEdit;