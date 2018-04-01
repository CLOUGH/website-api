const Controller = require('../../lib/controller');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const FroalaEditor = require('../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');

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

  upload(req, res, next) {
    if (req.query.froala === 'true') {
      this.froalaUploadFile(req, res, next);
    } else {
      this.regularUpload(req, res, next);
    }
  }

  getFile(req, res, next) {
    res.sendFile(path.join(this.uploadDir, req.params.fileName));
  }

  regularUpload(req, res, next) {
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
      console.log(files);
      res.status(200).json({
        uploaded: true,
        files
      });
    });

    form.on('fileBegin', (name, file) => {
      const [fileName, fileExt] = file.name.split('.');
      file.name = `${fileName}_${new Date().getTime()}.${fileExt}`;
      file.path = path.join(this.uploadDir, file.name);
    });
  }

  froalaUploadFile(req, res, next) {
    FroalaEditor.Image.upload(req, '/public/uploads/', (err, data) => {
      if (err) {
        return res.send(JSON.stringify(err)).status(500);
      }

      const filename = data.link.split('/')[3];
      const link = `${req.protocol}://${req.get('host')}/upload/${filename}`;

      res.send({
        link
      });
    });
  }
}

module.exports = new UploadController();
