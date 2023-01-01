import React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const AccountCreate = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Create>
      <TabbedForm>
        <FormTab label="account create" sx={{ maxWidth: "40em" }}>
          <TextInput sortable={false} source="surname" />
          <TextInput sortable={false} source="email" />
          <TextInput sortable={false} source="password" />
          <TextInput sortable={false} source="sex" />
          <TextInput sortable={false} source="phone" />
        </FormTab>
      </TabbedForm>
    </Create>
  ) : (
    <div>No access</div>
  );
};
export default AccountCreate;