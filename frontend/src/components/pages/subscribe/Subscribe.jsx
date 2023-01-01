import React, { useCallback, useState, useContext, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ababa from '../../../images/Muscle.jpg'
import {AuthContext} from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import Loader from "../../layout/loader/Loader";
import { useTranslation } from "react-i18next";



const Subscribe = () => {
  const auth = useContext(AuthContext);
  const { t, i18n } = useTranslation();
const { request } = useHttp();
const [isLoading, setIsLoading] = useState(false);

const randGen = () => {
  const abc =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  while (random.length < 100) {
    random += abc[Math.floor(Math.random() * abc.length)];
  }
  return random;
};
const fetchAccount = useCallback(async () => {
  try {
    await request("/api/user/me", "GET", null, {
      Authorization: `Bearer ${auth.token}`,
    }).then((res) => {
      setIsLoading(true);
    });
  } catch (e) {
    setIsLoading(true);
  }
}, [request, auth]);

useEffect(() => {
  fetchAccount();
}, [fetchAccount]);

const subscriptionHandler = async (dayOfSubscribe, price, name, key) => {
  try {
    await request(
      "/api/user/payment",
      "PUT",
      {
        ...{ dayOfSubscribe, price, name, key },
      },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    ).then(async (res) => {
      window.location.href = res.data;
    });
  } catch (e) {}
};
return isLoading ? (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
    <Card sx={{maxWidth: 345}}>
      <CardActionArea disabled>
        <CardMedia
          component="img"
          height="140"
          image={ababa}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {t("health")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {t("buytext")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => {
                  subscriptionHandler(30, 500, "Subscribe", randGen());
                }}
                 size="small" color="primary" sx={{justifyContent: 'center'}}>
           {t("buy")}
        </Button>
      </CardActions>
    </Card>
    </div>
  ): (
    <Loader />
  );
}
export default Subscribe;
