export const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
};

if (env.VITE_API_URL === undefined) {
  throw new Error("VITE_API_URL is undefined");
}
if (env.VITE_SOCKET_URL === undefined) {
  throw new Error("VITE_SOCKET_URL is undefined");
}
