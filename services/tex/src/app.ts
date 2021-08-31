import express from "express";
export const app = express();
const port = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World");
});

app.get("/hello", (req: express.Request, res: express.Response) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
