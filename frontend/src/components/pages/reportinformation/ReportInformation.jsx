import React from 'react';
import "./ReportInformation.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react';
import {useHttp} from "../../../hooks/http.hook"
import CanvasJSReact from "./canvasjs.react";
import Loader from "../../layout/loader/Loader";
import { useTranslation } from "react-i18next";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



const ReportInformation = () => {
  const [options, setOptions] = useState({});
    const history = useNavigate()
  const handleSubmit = event => {
   event.preventDefault();
   history("/reports");
 }
 const { t } = useTranslation();
 const { request } = useHttp();
 const { report_id } = useParams();
 const [isLoading, setIsLoading] = useState(true);
 const [report, setReport] = useState([]);
 const [tests, settests] = useState(null);
 const [isSubscription, setSubscription] = useState(false);
 const fetchReports = useCallback(async () => {
  try {
    const data = JSON.parse(localStorage.getItem("accountData"));
    const response = await request("/api/report/one", "POST", {_id: report_id}, {
      Authorization: `Bearer ${data.token}`,
    })
   const test_id = response.report.test_id;
   const response1 = await request(`/api/test/search?_id=${test_id}`, "GET")
   settests(response1.test)
   const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    zoomEnabled: true,
    title:{
      text: t("testdiagram")
    },
    axisY: {
      title: t("power"),
    },
    axisX: {
      title: t("time"),
      prefix: "sec",
      interval: 30
    },
    data: [{
      type: "line",
      toolTipContent: "Time {x}: {y}power",
      dataPoints: toArrayObjects(response1.test.power,Number(response1.test.testTime))
    }]
  }
  const response2 = await request("/api/user/subscription/status", "GET", null, {
    Authorization: `Bearer ${data.token}`,
  })
  setSubscription(response2.data)
  setOptions(options1);
setReport(response .report);
      setIsLoading(false);
console.log(test_id)
  } catch (e) {}
}, [request]);

useEffect(() => {
  fetchReports();
}, [fetchReports]);

const toArrayObjects = (array, time) => {
  const result = [];
  for (let j = 0; j < array.length; j++) {
    const obj = { y: array[j], x: j };
    result.push(obj);
  }
  return result;
}

  return !isLoading ? (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
      <p className='logo'>{t("report")}</p>
        <fieldset>
          <label className='label_container'>
            <p className='label_logo'>ID:</p>
            <p>{report._id}</p>
          </label>
          <label className='label_container'>
            <p className='label_logo'>{t("username")}:</p>
            <p>{report.userName}</p>
          </label>
          <label className='label_container'>
            <p className='label_logo'>{t("reportdate")}:</p>
            <p>{report.reportDate}</p>
          </label>
          <label className='label_container'>
            <p className='label_logo'>{t("result")}:</p>
            <p>{report.result}</p>
          </label>
          {isSubscription && (<div><label className='label_container'>
            <p className='label_logo'>{t("typeofpain")}:</p>
            <p>{report.typeOfPain}</p>
          </label>
          <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/></div>)}
        </fieldset>
        <div className="reportbtn">
        <button className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block" type="submit">{t("back")}</button>
        </div>
      </form>
    </div>
  ): (
    <Loader />
  );
}

export default ReportInformation;