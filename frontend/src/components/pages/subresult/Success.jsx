import React, { useCallback, useEffect, useContext } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { useNavigate, useParams } from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import "./Status.scss";
import Loader from "../../layout/loader/Loader";
import ababa from '../../../images/checked.png'
import { useTranslation } from "react-i18next";

const Success = () => {
  const history = useNavigate();
  const { loading, request } = useHttp();
  const { time, dayOfSubscribe, key } = useParams();
  const timeNow = new Date().getTime();
  const auth = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const fetchAccount = useCallback(async () => {
    try {
      if (
        time &&
        key &&
        (key.length === 100) & (timeNow - time < 3600000) &&
        dayOfSubscribe < 366
      ) {
        const data = JSON.parse(localStorage.getItem("accountData"));
        await request("/api/user/me", "GET", null, {
          Authorization: `Bearer ${data.token}`,
        }).then(async (res) => {
          const paymentKeys = res.user.paymentKeys;
          const allPaymentKeys = res.user.allPaymentKeys;
          if (!paymentKeys.includes(key) && allPaymentKeys.includes(key)) {
            await request(
              "/api/user/subscription",
              "PUT",
              { dayOfSubscribe: dayOfSubscribe, key: key },
              {
                Authorization: `Bearer ${data.token}`,
              }
            );
          }
        });
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const canceledHandler = () => {
    history("/reports");
  };

  return (
    <div class="page-wrapper">
  <div class="custom-modal">
    <img src={ababa} class="succes succes-animation icon-top"></img>
    <div class="succes border-bottom"></div>
    <div class="content">
      <p class="type">{t("health")}</p>
      <p class="message-type">{t("success")}</p>
      <button onClick={canceledHandler} class="button-box-green"><p class="red">{t("continue")}</p></button>
    </div>
  </div>
  </div>


  );
};

export default Success;