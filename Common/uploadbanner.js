import multer from "multer";
import path from "path";
import fs from 'fs';

const storageBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './static/banner/';
    
        fs.exists(dir, (exists) => {
            if (!exists) {
                return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
            }
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileTypeBanner(file, cb) {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif','video/mp4'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
}

const upload = multer({
    storage: storageBanner,
    limits: { fileSize: 1024 * 500 * 10 }, // you might want to move the limit to your environment variables
    fileFilter: (req, file, cb) => {
        checkFileTypeBanner(file, cb);
    }
}).single('banner_image'); // .single() is for single file upload. 'banner_image' is the field name.

const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }

        next(); 
    });
};

export default {
    uploadImage
};
