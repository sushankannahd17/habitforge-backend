const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith("image/")) {
            callback(new Error("Only image files"))
        } else {
            callback(null, true)
        }
    }
});

module.exports = upload;