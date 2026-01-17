export interface BkashPaymentCreateResponse {
  paymentID: string;
  bkashURL: string;
  callbackURL: string;
  success?: boolean;
  [key: string]: any;
}

export interface BkashExecuteResponse {
  paymentID: string;
  transactionStatus: string;
  amount: string;
  customerMsisdn?: string;
  trxID?: string;
  [key: string]: any;
}
