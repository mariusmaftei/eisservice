import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import clientRoute from "./routes/clientRoutes.js";
import providerRoute from "./routes/providerRouts.js";
import policyRoute from "./routes/providerRouts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "E.I.S. service API",
    message: "The E.Is.S. service backend service is up and running.",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use("/client", clientRoute);
app.use("/provider", providerRoute);
app.use("/policy", policyRoute);

const server = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

server();
