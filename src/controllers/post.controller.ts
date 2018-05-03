import { ResourceController } from "./resource.controller";
import Post from "../models/Post";
import { Response, Request, NextFunction, Router } from "express";

export class PostController extends ResourceController {
  constructor(public router: Router) {
    super(Post);
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/posts", this.index.bind(this));
    this.router.post("/posts", this.store.bind(this));
    this.router.get("/posts/:id", this.findOne.bind(this));
    this.router.put("/posts/:id", this.update.bind(this));
    this.router.delete("/posts/:id", this.delete.bind(this));
  }
}
