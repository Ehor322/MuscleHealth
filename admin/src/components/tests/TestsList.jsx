import React from "react";
import { usePermissions } from "react-admin";
import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

const ClothesList = (props) => {
  const { permissions } = usePermissions();

  return permissions === "Reabilitator" ? (
    <List {...props} pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        <TextField source="name" helperText={false} />
        <TextField source="testDate" helperText={false} />
        <TextField source="testTime" helperText={false} />
        <TextField source="result" helperText={false} />
        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default ClothesList;