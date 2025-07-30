export class BotFrameworkServices {


  static async getDirectLineObj(setDirectLineObj: Function, tokenUrl: string) {
    try {
      const mock = false;
      const directLineReq = await fetch(
        mock
          ? `https://webchat-mockbot.azurewebsites.net/directline/token`
          : tokenUrl, //   [middleware]/api/token
        {
          method: "POST",
        }
      );
      if (directLineReq.status !== 200) {
        throw new Error(
          `Server returned ${directLineReq.status} when requesting Direct Line token`
        );
      }
      const directLineRes = await directLineReq.json();
      setDirectLineObj(directLineRes);
    } catch (err) {
      console.log(err);
      // alert(`Failed to get Direct Line token for bot!.`);
    }
  }
}
