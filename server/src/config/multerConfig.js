import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subfolder = "others";

    if (file.mimetype.startsWith("image/")) {
      subfolder = "images";
    } else if (file.mimetype.startsWith("video/")) {
      subfolder = "videos";
    }
    
    const folder = path.join(path.resolve(), "src", "uploads", subfolder);

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and MP4 files are allowed"), false);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max
  },
});

export default upload;
