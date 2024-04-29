import express from "express";
import cors from "cors";
import backlogCollection from "./routes/record.js";
import contactCollection from "./routes/contact.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", backlogCollection);
app.use("/contact", contactCollection); //took me 30 minutes but I FOUND YOU

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});