import {
  Activity,
  DirectLine,
  DirectLineOptions
} from "botframework-directlinejs";

//TODO Find the type of this direct line response in their type definitions
export interface DirectLineEndpointRes {
  conversationID: string;
  expires_in: number; //3600
  token: string; // "e..eEw"
  userID: string; // "dl_d4...dfd"
}
/** Here to centralize any interaction with the directLine object created for the chat bot react component.
 * https://www.npmjs.com/package/botframework-directlinejs
 */
export class DirectLineHandlers {
  static postActivity(
    text: string,
    channelData: string,
  ): Activity {
    const extendedActivityObj = {
      text,
      type: "message",
      channelData: channelData,
    } as Activity;
    return extendedActivityObj;
  }
  /**
   * @param directLineRes The DirectLine token to be used to create the DirectLine object
   * @returns  A DirectLine object
   */
  static createDirectLine(
    createDirectLine: (options: any) => any,
    directLineRes: DirectLineEndpointRes,
  ): DirectLine {
    const { token} = directLineRes;
    const options: DirectLineOptions = {
      token: token,
      conversationStartProperties: {}
    };
    return createDirectLine(options);
  }
  // TODO handle reconnect to conversation saved on the server, 
  // Discuss if this is needed otherwise user must restart when reloading the browser or opening a different tab
  // var conversation = /* a Conversation object obtained from your app's server */;
  // directLine.reconnect(conversation);
}
