import fastify from "fastify";
import { userList } from "./routes/usersList";
import cors from "@fastify/cors";

const app = fastify();

app.register(userList, {
  prefix: "user"
})

app.register(cors, {
  origin: "*",

})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!')
})