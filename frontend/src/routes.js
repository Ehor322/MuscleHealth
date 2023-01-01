import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/login/Login.jsx";
import Reports from "./components/pages/reports/Reports.jsx";
import Subscribe from "./components/pages/subscribe/Subscribe.jsx";
import Faq from "./components/pages/faq/Faq.jsx";
import Canceled from "./components/pages/subresult/Canceled";
import Success from "./components/pages/subresult/Success";
import ReportInformation from "./components/pages/reportinformation/ReportInformation";
export const useRoutes = isAuthenticated =>{
  return (
    <Routes>
      <Route path="/faq" element={<Faq />} />
        <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/reportinformation/:report_id" element={<ReportInformation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/canceled" exact element={<Canceled />} />
          <Route
          path="/success/:key/:time/:dayOfSubscribe"
          exact
          element={<Success />}
        />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
