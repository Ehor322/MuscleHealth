import React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  DateInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { usePermissions } from "react-admin";

const ReportsCreate = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Reabilitator" ? (
    <Create>
      <TabbedForm>
        <FormTab label="report create" sx={{ maxWidth: "40em" }}>
          <TextInput sortable={false} source="userName" />
          <DateInput sortable={false} source="reportDate" />
          <TextInput sortable={false} source="result" />
          <TextInput sortable={false} source="typeOfPain" />
          <ReferenceInput label="test" source="test_id._id" reference="test">
            <SelectInput optionText="id" />
          </ReferenceInput>
          <ReferenceInput label="user" source="user_id._id" reference="user">
            <SelectInput optionText="id" />
          </ReferenceInput>
        </FormTab>
      </TabbedForm>
    </Create>
  ) : (
    <div>No access</div>
  );
};
export default ReportsCreate;