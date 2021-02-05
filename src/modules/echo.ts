import { create, Message, Whatsapp } from "venom-bot";
import { SESSION_STATE } from "../constants/session";
import EchoInterface from "../models/echo";
import Session, { SessionState, SessionStatus } from "../models/session";

export default class Echo implements EchoInterface {
  private _session: Session;

  get session(): Session {
    return this._session;
  }

  get connected(): boolean {
    return this._session.state === SESSION_STATE.CONNECTED;
  }

  constructor(sessionId: string) {
    const session = new Session(sessionId, "UNPAIRED", "notLogged");

    this._session = session;

    // Debug
    console.log(`[${sessionId}][session.state]`, session.state);
    console.log(`[${sessionId}][session.status]`, session.status);
  }

  public activate(): Promise<string> {
    const session = this._session;

    return new Promise((resolve, reject) =>
      create(
        session.id,
        (base64Qr) => {
          const reMatch = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

          if (reMatch?.length !== 3) {
            return reject(
              new Error("The string doesn't match the base64 format")
            );
          }

          const qrCode = reMatch[2];

          return resolve((session.qrCode = qrCode));
        },
        (status) => {
          session.status = status as SessionStatus;

          // Debug
          console.log(`[${session.id}][session.status]`, status);
        },
        {
          mkdirFolderToken: "/src/cache",
          headless: true,
          devtools: false,
          useChrome: false,
          debug: false,
          logQR: true,
          autoClose: 0,
          browserArgs: [
            "--log-level=3",
            "--no-default-browser-check",
            "--disable-site-isolation-trials",
            "--no-experiments",
            "--ignore-gpu-blocklist",
            "--ignore-certificate-errors-spki-list",
            "--disable-gpu",
            "--disable-extensions",
            "--disable-default-apps",
            "--enable-features=NetworkService",
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--disable-webgl",
            "--disable-threaded-animation",
            "--disable-threaded-scrolling",
            "--disable-in-process-stack-traces",
            "--disable-histogram-customizer",
            "--disable-gl-extensions",
            "--disable-composited-antialiasing",
            "--disable-canvas-aa",
            "--disable-3d-apis",
            "--disable-accelerated-2d-canvas",
            "--disable-accelerated-jpeg-decoding",
            "--disable-accelerated-mjpeg-decode",
            "--disable-app-list-dismiss-on-blur",
            "--disable-accelerated-video-decode",
          ],
        }
      ).then(async (client) => await this._setup(client))
    );
  }

  public async deactivate(): Promise<boolean> {
    const { client } = this._session;

    return await client.close();
  }

  public async send(to: string, data: string): Promise<void> {
    const { client } = this._session;

    await client.sendText(`${to}@c.us`, data);
  }

  private async _setup(client: Whatsapp): Promise<void> {
    const session = this._session;

    session.client = client;
    session.state = await client.getConnectionState();
    session.token = await client.getSessionTokenBrowser();

    client.onStateChange((state) => this._onStateChange(state as SessionState));
    client.onMessage((message) => this._onMessage(message));
  }

  private _onStateChange(state: SessionState): void {
    const session = this._session;

    session.state = state;
  }

  private _onMessage(message: Message): void {
    if (message.isGroupMsg || message.isMedia) return;

    const session = this._session;

    // Debug
    console.log(`[${session.id}][message]`, message.from);
    console.log(`[${session.id}][message]`, message.body);
  }
}
