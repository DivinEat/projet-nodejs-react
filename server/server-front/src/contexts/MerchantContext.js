import { createContext, useState } from "react";
const http = require("http");

export const MerchantContext = createContext();

export default function MerchantProvider({ children }) {
  const save = function (societyName, kbis, confirmUrl, cancelUrl, transactionSuccessUrl, currency) {

    console.log(kbis);
    const data = JSON.stringify({
      "societyName": societyName,
      "kbis": kbis,
      "confirmUrl": confirmUrl,
      "cancelUrl": cancelUrl,
      "transactionSuccessUrl": transactionSuccessUrl,
      "currency": currency
    });

    const options = {
      hostname: "localhost",
      port: 3001,
      path: "/merchants",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const request = http.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    request.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    request.write(data);
    request.end();
  };

  return (
    <MerchantContext.Provider
      value={{ save }}
    >
      {children}
    </MerchantContext.Provider>
  );
}
