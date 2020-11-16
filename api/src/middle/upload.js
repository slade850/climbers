const multer = require("multer");

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|mpg|mpeg|mpeg4|mp4|avi)$/)) {
        return cb(new Error('This file type are not allowed!'), false);
    }
    cb(null, true);
};

const fileSizeLimit = 15 * 1024 * 1024;

const upFiles = (folder, fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./files/${folder}`)
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${file.originalname}`)
        }
    })

    return (req, res, next) => {
        const upload = multer({ storage: storage , fileFilter: fileFilter, limits: {fileSize: fileSizeLimit}});
        if(fieldName == "avatar" || fieldName == "picture"){
            return upload.single(fieldName)(req, res, (err) => {
                err ? res.status(400).send("unsupported file, please check the file type and not exceed 15Mo") : next();
            })
        } else {
            return upload.array(fieldName, 5)(req, res, (err) => {
                err ? res.status(400).send("unsupported file, please check the file type and not exceed 15Mo") : next();
            })
        }
    }
}

module.exports = upFiles;