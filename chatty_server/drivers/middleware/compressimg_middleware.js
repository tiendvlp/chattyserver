const compress_images = require("compress-images");
const fs = require('fs')

var compressWithMoji = function(req, res, next) {
        let INPUT_path_to_your_images = req.resource.folderPath + "/" + req.resource.fileName;
        let OUTPUT_path = req.resource.type.folderPath + "/";
        console.log("Path" + INPUT_path_to_your_images)
        compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: true, statistic: true, autoupdate: true }, false, { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } }, { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } }, { svg: { engine: "svgo", command: "--multipass" } }, { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
            function(error, completed, statistic) {
                console.log("-------------");
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log("-------------");
                try {
                    fs.unlinkSync(req.resource.folderPath + "/" + req.resource.fileName)
                    return next()
                } catch (err) {
                    console.error(err)
                }
            }
        );
    } //
module.exports = compressWithMoji /////