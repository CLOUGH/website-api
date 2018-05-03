import { ResourceController } from "./resource.controller";
import { Router } from "express";
import Page from "../models/Page";

export class PageController extends ResourceController {
  constructor(public router: Router) {
    super(Page);
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/pages", this.index.bind(this));
    this.router.post("/pages", this.store.bind(this));
    this.router.get("/pages/:id", this.findOne.bind(this));
    this.router.put("/pages/:id", this.update.bind(this));
    this.router.delete("/pages/:id", this.delete.bind(this));
  }
}
