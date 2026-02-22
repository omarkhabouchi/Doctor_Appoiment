const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/routeUser");
const routerUser = require("./routes/routeUser");
const routerDoctor = require("./routes/routeDoctor");
const routerAppointment = require("./routes/routeAppointment");
const routerDepartment = require("./routes/routeDepartment");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();
app.use(cors());

app.use("/user", userRouter);
app.use("/userr", routerUser);
app.use("/doctors", routerDoctor);
app.use("/files", express.static("imagesUploads"));
app.use("/appointments", routerAppointment);
app.use("/departments", routerDepartment);

app.get("/user", async (req, res) => {
  console.log("hllo omarmlp");
  res.send("omaryto");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

/**eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpY2hhQHRlc3QuY29tIiwiaWQiOiI2OThjYjFkZjNkMzYzZGU5NmQxZjM1ODciLCJpYXQiOjE3NzA4MjgyNTUsImV4cCI6MTc3MTQzMzA1NX0.RwVVfRfXH77x_TAB7vWWZDTS-Lq3hd4Y-0tvNrJZDrk*/
