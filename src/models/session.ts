import { Whatsapp } from "venom-bot";

export type SessionState =
  | "CONFLICT"
  | "CONNECTED"
  | "DEPRECATED_VERSION"
  | "OPENING"
  | "PAIRING"
  | "PROXYBLOCK"
  | "SMB_TOS_BLOCK"
  | "TIMEOUT"
  | "TOS_BLOCK"
  | "UNLAUNCHED"
  | "UNPAIRED"
  | "UNPAIRED_IDLE"
  | "DISCONNECTED"
  | "RESUMING"
  | "SYNCING";

export type SessionStatus =
  | "isLogged"
  | "notLogged"
  | "browserClose"
  | "qrReadSuccess"
  | "qrReadFail"
  | "autocloseCalled"
  | "desconnectedMobile"
  | "deleteToken";

export interface SessionToken {
  WABrowserId: string;
  WAToken1: string;
  WAToken2: string;
  WASecretBundle: string;
}

export default class Session {
  private _id!: string;
  private _token!: SessionToken;
  private _state!: SessionState;
  private _status!: SessionStatus;
  private _qrCode!: string;
  private _client!: Whatsapp;

  constructor(id: string, state: SessionState, status: SessionStatus) {
    this._id = id;
    this._state = state;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  get token(): SessionToken {
    return this._token;
  }
  set token(token: SessionToken) {
    this._token = token;
  }

  get state(): SessionState {
    return this._state;
  }
  set state(state: SessionState) {
    this._state = state;
  }

  get status(): SessionStatus {
    return this._status;
  }
  set status(status: SessionStatus) {
    this._status = status;
  }

  get qrCode(): string {
    return this._qrCode;
  }
  set qrCode(qrCode: string) {
    this._qrCode = qrCode;
  }

  get client(): Whatsapp {
    return this._client;
  }
  set client(client: Whatsapp) {
    this._client = client;
  }
}
