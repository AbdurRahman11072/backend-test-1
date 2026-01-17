import axios from "axios";

const BASE_URL = process.env.BKASH_BASE_URL!;
const credentials = {
  app_key: process.env.BKASH_APP_KEY!,
  app_secret: process.env.BKASH_APP_SECRET!,
  username: process.env.BKASH_USERNAME!,
  password: process.env.BKASH_PASSWORD!,
};

let id_token: string | null = null;

export async function getBkashToken(): Promise<string> {
  const res = await axios.post(
    `${BASE_URL}/token/grant`,
    {
      app_key: credentials.app_key,
      app_secret: credentials.app_secret,
    },
    {
      headers: {
        username: credentials.username,
        password: credentials.password,
        "Content-Type": "application/json",
      },
    }
  );
  id_token = res.data.id_token;
  return id_token!;
}

export async function createBkashPayment(amount: string, orderId: string) {
  if (!id_token) await getBkashToken();

  const payload = {
    mode: "0011",
    payerReference: " ",
    callbackURL: "https://your-domain.com/api/bkash/execute",
    amount,
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: orderId,
  };

  const res = await axios.post(
    `${BASE_URL}/tokenized/checkout/create`,
    payload,
    {
      headers: {
        authorization: id_token!,
        "x-app-key": credentials.app_key,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

export async function executeBkashPayment(paymentID: string) {
  const res = await axios.post(
    `${BASE_URL}/tokenized/checkout/execute`,
    { paymentID },
    {
      headers: {
        authorization: id_token!,
        "x-app-key": credentials.app_key,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}
