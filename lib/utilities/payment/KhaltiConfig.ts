/* eslint-disable import/no-mutable-exports */
import axios from "axios";

import { globalConstant } from "constant/constant";

import myKey from "./KhaltiKey";

const config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "1234567890",
  productName: "Your School Software",
  productUrl: `${globalConstant.baseURL}`,
  eventHandler: {
    onSuccess(payload: any) {
      // hit merchant api for initiating verfication
      const data = {
        token: payload.token,
        amount: payload.amount,
      };

      const configII = {
        headers: {
          Authorization: myKey.secretKey,
        },
      };

      axios
        .post("https://khalti.com/api/v2/payment/verify/", data, configII)
        .then((response) => {
          console.log(response.data);
          alert("thank you for payment");
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(payload);
    },
    // onError handler is optional
    onError(error: any) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;
