import { Router } from "express";
import * as path from "path";
import * as fs from "fs";
import * as formidable from "formidable";

export class UploadController {
  private uploadDir: string;

  constructor(public router: Router) {
    this.uploadDir = path.join(__dirname, "/../../dist/public/uploads/");
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/upload", this.upload.bind(this));
    this.router.get("/upload/:fileName", this.getFile.bind(this));
    this.router.delete("/upload/:fileName", this.deleteFile.bind(this));
  }

  upload(req, res, next) {
    const form = new formidable.IncomingForm();

    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = this.uploadDir;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }

      const file = files[Object.keys(files)[0]];

      res.status(200).json({
        uploaded: 1,
        fileName: file.name,
        url: file.link,
        size: file.size
      });
    });

    form.on("fileBegin", (name, file) => {
      const [fileName, fileExt] = file.name.split(".");
      file.name = `${fileName}_${new Date().getTime()}.${fileExt}`;
      file.path = path.join(this.uploadDir, file.name);
      file.link = `${req.protocol}://${req.get("host")}/upload/${file.name}`;
    });
  }

  getFile(req, res, next) {
    res.sendFile(path.join(this.uploadDir, req.params.fileName));
  }

  deleteFile(req, res, next) {
    fs.unlink(path.join(this.uploadDir, req.params.fileName), (error) => {
      if (error) {
        throw error;
      }
      res.status(204).send();
    });
  }
}
