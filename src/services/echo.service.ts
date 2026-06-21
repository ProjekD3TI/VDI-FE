import Echo from "laravel-echo";
import Pusher from "pusher-js";

// 1. Definisikan Pusher secara global dengan aman
(window as any).Pusher = Pusher;

// 2. Ambil nilai dari environment variables dengan nilai fallback (default)
const wsHost = import.meta.env.VITE_REVERB_HOST || "localhost";
const wsPort = parseInt(import.meta.env.VITE_REVERB_PORT || "8080", 10);
const scheme = import.meta.env.VITE_REVERB_SCHEME || "http";

// 3. Inisialisasi Echo Instance sebagai singleton service
const echoClient = new Echo({
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: wsHost,
  wsPort: wsPort,
  forceTLS: scheme === "https",
  enabledTransports: ["ws", "wss"], // Memaksa hanya menggunakan WebSocket (lebih cepat)
  disableStats: true,
});

export default echoClient;
