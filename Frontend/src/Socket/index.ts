import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_BACKEND_SOCKET_API as string;
const socket = io(URL);
export default socket;
