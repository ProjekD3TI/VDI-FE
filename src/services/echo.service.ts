import { config } from "@/lib/config";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const wsHost = config.REVERB_HOST || "localhost";
const wsPort = Number(config.REVERB_PORT || 80);
const wssPort = Number(config.REVERB_PORT || 80);
const scheme = config.REVERB_SCHEME || "http";

const echoClient = new Echo({
  broadcaster: "reverb",
  key: config.REVERB_APP_KEY,
  wsHost,
  wsPort,
  wssPort,
  forceTLS: scheme === "https",
  enabledTransports: ["ws", "wss"],
  disableStats: true,
});

export default echoClient;
