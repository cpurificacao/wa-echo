import { SessionState } from "../@types/venom-bot/session-state";
import { SessionStatus } from "../@types/venom-bot/session-status";
import { SessionToken } from "../@types/venom-bot/session-token";

export default class Session {
  private _id!: string;
  private _echo!: any;
  private _token!: SessionToken;
  private _state!: SessionState;
  private _status!: SessionStatus;
  private _qrCode!: string;

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

  get echo(): any {
    return this._echo;
  }
  set echo(echo: any) {
    this._echo = echo;
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
}
