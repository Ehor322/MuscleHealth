import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import "./Status.scss";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Loader from "../../layout/loader/Loader";
import ababa from '../../../images/canceled.png'
import { useTranslation } from "react-i18next";

const Canceled = () => {
  const { t, i18n } = useTranslation();
  const history = useNavigate();
  const { loading } = useHttp();

  const canceledHandler = () => {
    history("/subscribe");
  };

  return (
    <div class="page-wrapper">
   <div class="custom-modal">
   <img src={ababa} class="danger danger-animation icon-top"></img>
    <div class="danger border-bottom"></div>
    <div class="content">
      <p class="type">{t("health")}</p>
      <p class="message-type">{t("tryagain")}</p>
      <button onClick={canceledHandler} class="button-box-red"><p class="green">{t("continue")}</p></button>
    </div>
  </div>
</div>


  );
};

export default Canceled;