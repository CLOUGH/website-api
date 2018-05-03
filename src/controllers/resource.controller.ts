import { Document, Schema, Model } from "mongoose";
import { Request, Response, NextFunction, RequestHandler } from "express";

export class ResourceController {
  constructor(public model: Model<any>) { }
  /**
   * Default method for creating a resource
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns
   * @memberof ResourceController
   */
  store(req: Request, res: Response, next: NextFunction) {
    const model = new this.model(req.body);
    return model.save()
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err));
  }

  /**
   * Default method for getting resources
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns
   * @memberof ResourceController
   */
  index(req: Request, res: Response, next: NextFunction) {
    return this.model.find(req.query)
      .then(collection => res.status(200).json(collection))
      .catch(err => next(err));
  }

  /**
   * Default method for getting a single resource
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns
   * @memberof ResourceController
   */
  findOne(req: Request, res: Response, next: NextFunction) {
    return this.model.findOne(req.query)
      .then(doc => res.status(200).json(doc))
      .catch(err => next(err));
  }

  /**
   * Default resource method for getting a single resource by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns
   * @memberof ResourceController
   */
  show(req: Request, res: Response, next: NextFunction) {
    return this.model.findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.status(200).json(doc);
      })
      .catch(err => next(err));
  }

  /**
   * Default method for updating a resource
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof ResourceController
   */
  update(req: Request, res: Response, next: NextFunction) {
    this.model.update({
      _id: req.params.id
    }, req.body)
      .then((results) => {
        if (results.n < 1) {
          return res.sendStatus(404);
        }
        if (results.nModified < 1) {
          return res.sendStatus(304);
        }
        res.sendStatus(204);
      })
      .catch(err => next(err));
  }


  /**
   * Default method removing a resource
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof ResourceController
   */
  delete(req: Request, res: Response, next: NextFunction) {
    this.model.remove({
      _id: req.params.id
    })
      .then((doc) => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.sendStatus(204);
      })
      .catch(err => next(err));
  }
}
