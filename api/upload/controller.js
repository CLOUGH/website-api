const Controller = require('../../lib/controller');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

class UploadController extends Controller {
  constructor(...args) {
    super(...args);
    this.uploadDir = path.join(__dirname, '/../../public/uploads/');
  }
  delete(req, res, next) {
    fs.unlink(path.join(this.uploadDir, req.params.fileName), (error) => {
      if (error) {
        throw error;
      }
      res.status(204).send();
    });
  }

  getFile(req, res, next) {
    res.sendFile(path.join(this.uploadDir, req.params.fileName));
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

    form.on('fileBegin', (name, file) => {
      const [fileName, fileExt] = file.name.split('.');
      file.name = `${fileName}_${new Date().getTime()}.${fileExt}`;
      file.path = path.join(this.uploadDir, file.name);
      file.link = `${req.protocol}://${req.get('host')}/upload/${file.name}`;
    });
  }

}

module.exports = new UploadController();
