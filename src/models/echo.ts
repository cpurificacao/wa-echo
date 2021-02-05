import Session from "./session";

export default interface EchoInterface {
  session: Session;
  connected: boolean;
  activate(): Promise<string>;
  deactivate(): Promise<boolean>;
  send(to: string, data: string): Promise<void>;
}
