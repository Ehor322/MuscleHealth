import { React } from "react";
import { Admin, defaultTheme } from "react-admin";
import LoginAdmin from "./components/login/Login";
import { authProvider } from "./authProvider/authProvider";
import { Resource } from "react-admin";
import accounts from "./components/accounts";
import { dataProvider } from "./dataProvider/dataProvider";
import "./App.css";
import tests from "./components/tests";
import reports from "./components/reports";
import GroupIcon from "@mui/icons-material/Group";
import BiotechIcon from '@mui/icons-material/Biotech';
import SummarizeIcon from '@mui/icons-material/Summarize';

const theme = {
  ...defaultTheme,
  palette: {
    mode: "dark",
  },
};
const App = () => {
  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginAdmin}
    >
      {(permissions) => (
        <>
          {permissions === "Reabilitator" ? (
            <>
              <Resource icon={GroupIcon} name="user" {...accounts} />
              <Resource icon={BiotechIcon} name="test" {...tests} />
              <Resource icon={SummarizeIcon} name="report" {...reports} />
            </>
          ) : null}
        </>
      )}
    </Admin>
  );
};

export default App;