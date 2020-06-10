//Using Multer to save files in storage
const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination:path.resolve(__dirname, "..", "..", "files"),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext) //Rename the files, with the given name + type of extension

            cb(null, `${name.replace(/\s/g,"")}-${Date.now()}${ext}`) //Search and replace using RegEx, to rename file
        }
    })


}