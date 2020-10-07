const sharp = require('sharp');
const accepted_file_types =  ["png", "jpg", "jpeg", "webp"]
const uuid = require('uuid')

module.exports = async function saveImage(image){
    return new Promise((resolve,reject)=>{
        if(!image) return reject("No Image Added");
        const filetype= (image.name).split('.').pop();
        if(!accepted_file_types.includes(filetype)) return reject("Unsupported File Type");
        imageID = uuid.v4()
        randomstringpath = `images/${imageID}.jpeg`;
 
        sharp(image.path)
        .resize(600, 400, {
            fit: "cover"
        })
        .toFile(`${randomstringpath}`, (err, info) => {
            if (err) return reject(err);
            console.log(info)
            resolve(imageID);
        });
    })
}
