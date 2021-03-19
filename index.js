// Require variables from .env
require("dotenv").config();

// Initial express
const express = require("express");

// Initial cookie-parser
const cookieParser = require("cookie-parser");

// Initial express flash
const flash = require("express-flash");

// Initial express session
const session = require("express-session");

const authRoute = require("./routes/auth.route");
const dashboardRoute = require("./routes/weather.route");
// Require routes

// App setup
const app = express();
const port = process.env.PORT || 5555;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(express.static("public"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


preventWhenLogged = (req, res, next) => {
    if (req.signedCookies.userData) {
        res.redirect("/weather");
    } else {
        next();
    }
};

requireAuth = async(req, res, next) => {
    // Get user info if user has logged in by user id in cookie

    // Check if user has not logged in
    if (!req.signedCookies.userData) {
        res.redirect("/login");
        return;
    } else { res.redirect("/weather") }
    next();
};


// Default app endpoint
app.get("/", (req, res) => {
    if (req.signedCookies.userData) {
        res.render("weather", {
            userData: req.signedCookies.userData,
        });
    } else {
        res.redirect("/signin");
    }
});

// User sign out endpoint
app.get("/signout", (req, res) => {
    res.clearCookie("userData");
    res.clearCookie("googleIdToken");
    res.redirect("/signin");
});

app.use("/", preventWhenLogged, authRoute);
app.use("/weather", requireAuth, dashboardRoute);

// Server listen
app.listen(port, () => {
    console.log(`Your running server: http://localhost:${port}`);
});