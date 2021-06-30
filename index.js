const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const postRouter = require("./routes/postRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// A clever way to try to connect if the db isn't ready yet...just try every 5 seconds.
// However, I think we'd really want an exponential backoff: https://dzone.com/articles/understanding-retry-pattern-with-exponential-back#:~:text=Exponential%20Backoff%20to%20the%20Rescue,we%20retry%20after%20one%20second.
const connectWithRetry = () => {
  mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  });
}

connectWithRetry();

// a middleware that allows me to pass body to request object
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi There yo</h2>")
})

app.use("/api/v1/posts", postRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));