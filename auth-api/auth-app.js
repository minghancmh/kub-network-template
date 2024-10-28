const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/verify-token/:token", (req, res) => {
  console.log("[auth-service]: /verify-token called");
  console.log("[auth-service]: token=", req.params.token);
  const token = req.params.token;

  // dummy verification!
  if (token === "abc") {
    return res.status(200).json({ message: "Valid token.", uid: "u1" });
  }
  res.status(401).json({ message: "Token invalid." });
});

app.get("/token/:hashedPassword/:enteredPassword", (req, res) => {
  console.log("[auth-service]: /token endpoint called");
  console.log("[auth-service]: hashedPassword=", req.params.hashedPassword);
  console.log("[auth-service]: enteredPassword=", req.params.enteredPassword);
  const hashedPassword = req.params.hashedPassword;
  const enteredPassword = req.params.enteredPassword;

  // dummy password verification!
  if (hashedPassword === enteredPassword + "_hash") {
    const token = "abc";
    return res.status(200).json({ message: "Token created.", token: token });
  }
  res.status(401).json({ message: "Passwords do not match." });
});

app.get("/hashed-password/:password", (req, res) => {
  console.log("[auth-service]: /hashed-password endpoint called");
  console.log("[auth-service]: enteredPassword=", req.params.enteredPassword);
  // dummy hashed pw generation!
  const enteredPassword = req.params.password;
  const hashedPassword = enteredPassword + "_hash";
  res.status(200).json({ hashedPassword: hashedPassword });
});

app.listen(80);
