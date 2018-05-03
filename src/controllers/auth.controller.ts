import { Router, Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../util/secrets";
import passport from "passport";
import jwt from "jsonwebtoken";

export class AuthController {

  constructor(public router: Router) {
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("auth/login", this.login.bind(this));
  }

  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(400).json(info);
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          type: user.type
        },
          JWT_SECRET, {
            expiresIn: "1m"
          });

        // const refresh_token = jwt.sign({
        //   user: {
        //     id: user.id
        //   },
        // },
        //   config.jwt.refresh_secret, {
        //     expiresIn: "7d"
        //   }
        // );

        return res.json({
          token
        });

      });
    })(req, res, next);
  }
}
