export type SessionStatus =
  | "isLogged"
  | "notLogged"
  | "browserClose"
  | "qrReadSuccess"
  | "qrReadFail"
  | "autocloseCalled"
  | "desconnectedMobile"
  | "deleteToken";
