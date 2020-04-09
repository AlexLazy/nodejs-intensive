import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import routes from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", 2000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use(routes);

export default app;
