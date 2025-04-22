import Pusher from "pusher-js";

const pusher = new Pusher("0165e1986359f4b121b9", {
  cluster: "eu",
  encrypted: true,
});

export default pusher;
