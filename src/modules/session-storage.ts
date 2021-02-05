import EchoInterface from "../models/echo";

export default class SessionStorage {
  private static _data: EchoInterface[] = [];

  public static add(echo: EchoInterface): number {
    return SessionStorage._data.push(echo);
  }

  public static remove(sessionId: string): void {
    SessionStorage._data = SessionStorage._data.filter(
      ({ session }) => sessionId !== session.id
    );
  }

  public static get(sessionId: string): EchoInterface | null {
    const session = SessionStorage._data.find(
      ({ session }) => sessionId === session.id
    );

    return session || null;
  }

  public static getAll(): EchoInterface[] {
    return SessionStorage._data;
  }
}
