import { Router, Request, Response } from "express";
const router = Router();
import passport from "passport";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Controllers
import { AuthController } from "./controllers/auth.controller";
import { PostController } from "./controllers/post.controller";
import { GoogleAnalyticsController } from "./controllers/google-analytics.controller";
import { PageController } from "./controllers/page.controller";
import { UploadController } from "./controllers/upload.controller";

const postController = new PostController(router);
const authController = new AuthController(router);
const googleAnalytics = new GoogleAnalyticsController(router);
const pageController = new PageController(router);
const uploadController = new UploadController(router);

// route definitions
// router.route("/")
// // .all((req: Request, res: Response) => {
// //   res.json({
// //     message: "Welcome to website-api API!"
// //   });
// // });

/**
 * Primary router routes.
 */
// router.post("/login", userController.postLogin);
// router.get("/logout", userController.logout);
// router.get("/forgot", userController.getForgot);
// router.post("/forgot", userController.postForgot);
// router.get("/reset/:token", userController.getReset);
// router.post("/reset/:token", userController.postReset);
// router.get("/signup", userController.getSignup);
// router.post("/signup", userController.postSignup);
// router.get("/contact", contactController.getContact);
// router.post("/contact", contactController.postContact);
// router.get("/account", passportConfig.isAuthenticated, userController.getAccount);
// router.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
// router.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// router.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
// router.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
// router.get("/api", apiController.getApi);
// router.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
// router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   res.redirect(req.session.returnTo || "/");
// });





// const page = require("./api/page/router");
// const post = require("./api/post/router");
// const user = require("./api/user/router");
// const upload = require("./api/upload/router");
// const auth = require("./api/auth/router");
// const googleAnalytics = require("./api/google-analytics/router");

// router.use("/page", page);
// router.use("/users", user);
// router.use("/upload", upload);
// router.use("/auth", auth);
// router.use("/google-analytics", googleAnalytics);




export default router;
