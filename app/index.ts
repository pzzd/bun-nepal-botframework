import { serve } from "bun";
import chatbot from "./chatbot/index.html";
import BunLogger from "./logger.js";
import { BotFrameworkServices } from './botFramework';
import { DirectLineEndpointRes, DirectLineHandlers } from './chat-bot-direct-line';

const logger = BunLogger;



const server = serve({
  port: 3000,
//   fetch(req) {
//     return new Response("Bun!");
//   },

  routes: {
    // Serve index.html for all unmatched routes.
     "/*": chatbot,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      }
    },

    "/api/ask-nobody": {
        async POST(req) {
          console.log("Incoming call to /api/ask-nobody");
          const body = await req.json();
          const modelReply = "This is a mock response.";
          logger.log(`{ "userMessage": "${body.userMessage}", "model": "nobody", "modelReply": "${modelReply}" }`);

          return Response.json({
            message: modelReply,
            error: null
          });
        }
    },

    // Bot Framework sends messages here.
    "/api/messages": {
        async POST(req) {
          console.log("Incoming call to /api/messages");

          return Response.json({
            message: 'nothing to say',
            error: null
          });
        }
    },

    // BotFrameworkServices.getDirectLineObj(setDirectLineRes, tokenUrl)

    "/api/ask-botframework": {
        async POST(req) {
          console.log("Incoming call to /api/ask-botframework");
          const body = await req.json();
          const modelReply = "This is a mock Bot Framework response.";
          logger.log(`{ "userMessage": "${body.userMessage}", "model": "botframework", "modelReply": "${modelReply}" }`);

          // const directLineRes = DirectLineEndpointRes;
          // const tokenUrl = null;
          // BotFrameworkServices.getDirectLineObj(directLineRes, tokenUrl);

          return Response.json({
            message: modelReply,
            error: null
          });
        }
    }
  },




  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

});

console.log(`Listening on http://localhost:${server.port} ...`);