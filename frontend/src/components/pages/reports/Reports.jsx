import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom'
import "./Report.scss"
import { useCallback, useEffect, useState } from 'react';
import {useHttp} from "../../../hooks/http.hook"
import Loader from "../../layout/loader/Loader";
import { useTranslation } from "react-i18next";

const Reports = () => {
  const history = useNavigate()
  const { t } = useTranslation();
  const handleSubmit = (event) => {
    history(`/reportinformation/${event}`);
  }
  const { request } = useHttp();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const fetchReports = useCallback(async () => {
    try {
      const data = JSON.parse(localStorage.getItem("accountData"));
      await request("/api/report/get", "GET", null, {
        Authorization: `Bearer ${data.token}`,
      }).then((res) => {
        setReports(res.report);
        setIsLoading(false);
      });
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return !isLoading ?  (
    <form >
      <p className="report_logo">Reports</p>
      <div class="table-container">
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>{t("username")}</th>
              <th>{t("reportdate")}</th>
              <th>{t("result")}</th>
              <th>{t("details")}</th>
            </tr>
          </thead>
          <tbody >

            {reports.map((item) => {
              return (
              <tr>  
                <td>{item._id}</td>
                <td>{item.userName}</td>
                <td>{item.reportDate}</td>
                <td>{item.result}</td>
                <td><IconButton className='iconbtn' onClick={() => {handleSubmit(item._id)}}>
                  <Visibility />
                </IconButton></td>
              </tr>
  )
            })}
          </tbody>

        </table>

      </div>
    </form>
  ) : (
    <Loader />
  );
}
export default Reports;