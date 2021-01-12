const multer = require("multer");

//filter for all autorized files
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|mpg|mpeg|mpeg4|mp4|avi)$/)) {
        return cb(new Error('This file type are not allowed!'), false);
    }
    cb(null, true);
};
//filter for autorized images only
const singleImgFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('This file type are not allowed!'), false);
    }
    cb(null, true);
}

//15 Mega byte to byte conversion
const fileSizeLimit = 15 * 1024 * 1024;

//function for check type of multer error
const checkErrorType = (error) => {
    return error instanceof multer.MulterError ?
    error.code == 'LIMIT_FILE_SIZE' ?
        "file too large, it should not exceed 15Mo"
        :
        "too many files sent"
    :
    error.message;
}

//middleware function for upload file with multer, takes 2 parameters a folder and a form field name
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
        const upload = multer({ storage: storage , fileFilter: (fieldName == "avatar" || fieldName == "picture") ? singleImgFilter : fileFilter, limits: {fileSize: fileSizeLimit}});
        if(fieldName == "avatar" || fieldName == "picture"){
            return upload.single(fieldName)(req, res, (err) => {
                err ? res.status(400).send(checkErrorType(err)) : next();
            })
        } else {
            return upload.array(fieldName, 5)(req, res, (err) => {
                err ? res.status(400).send(checkErrorType(err)) : next();
            })
        }
    }
}

module.exports = upFiles;