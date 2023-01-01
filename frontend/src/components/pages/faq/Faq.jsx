import * as React from 'react';
import "./Faq.scss"
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useTranslation } from "react-i18next";


const Faq = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => {
        
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('Message sent', { variant });
      };

  const form = useRef();
  function sendEmail(e) {
    try{
    e.preventDefault();

    emailjs.sendForm('service_12k2nih', 'template_cyvn7fa', form.current, 'nFV8YI8koVrkudt2J')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    e.target.reset()
    handleClickVariant("success");
}catch(e){
     
    }
};
  return (
    <section>
    {/* <NotificationContainer /> */}
    <div class="fcf-body">
      
    <div id="fcf-form">
    <h3 class="fcf-h3">{t("contactus")}</h3>

    <form ref={form} onSubmit={sendEmail} id="fcf-form-id" class="fcf-form-class" method="post" action="contact-form-process.php">
        
        <div class="fcf-form-group">
            <label for="Name" class="fcf-label">{t("yourname")}</label>
            <div class="fcf-input-group">
                <input type="text" id="Name" name="name" class="fcf-form-control" required/>
            </div>
        </div>

        <div class="fcf-form-group">
            <label for="Email" class="fcf-label">{t("youremailadress")}</label>
            <div class="fcf-input-group">
                <input type="email" id="Email" name="email" class="fcf-form-control" required/>
            </div>
        </div>

        <div class="fcf-form-group">
            <label for="Message" class="fcf-label">{t("yourmessage")}</label>
            <div class="fcf-input-group">
                <textarea id="Message" name="message" class="fcf-form-control" rows="6" maxlength="3000" required></textarea>
            </div>
        </div>

        <div class="sendbtn">
            <button  type="submit" id="fcf-button" class="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">{t("sendmessage")}</button>
        </div>

    </form>
    </div>
    </div>
    </section>
  );
}
export default Faq;
