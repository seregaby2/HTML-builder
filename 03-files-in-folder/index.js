// let fs = require('fs');
// fs.readdir('03-files-in-folder/secret-folder',  {withFileTypes: true}, (err, files) => {
//     if (err) {
//         console.log(Error)
//     }
//     else {
//         files.forEach((file) => {
//             if(file.isFile()) {
//                 const fileName = file.name.toString().split('.')[0];
//                 const fileExt = file.name.toString().split('.')[1];
//                 fs.stat(`03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
//                     if(err) {
//                         console.log('error of stat')
//                     }
//                     else {
//                        const fileSize = stats.size/1024
//                        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`)
//                     }
//                 })
                
//             }

//         })
//     }
// })


let fs = require('fs');
let path = require('path');
fileWay = path.join(__dirname, 'secret-folder');

fs.readdir(fileWay,  {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(Error)
    }
    else {
        files.forEach((file) => {
            if(file.isFile()) {
                const fileName = path.basename(`${file.name}`).split('.')[0];
                const fileExt = path.extname(`${file.name}`).split('.')[1];
                const fileWayForSize = path.join(__dirname, './secret-folder', `${file.name}`)
                fs.stat(fileWayForSize, (err, stats) => {
                    if(err) {
                        console.log('error of stat')
                    }
                    else {
                       const fileSize = stats.size/1024
                       console.log(`${fileName} - ${fileExt} - ${fileSize}kb`)
                    }
                })
                
            }
        })
    }
})