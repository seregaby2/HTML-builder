
const fs = require('fs');
const path = require('path');
const filesFolderWay = path.join(__dirname, 'files')

fs.mkdir('04-copy-directory/files-copy',{recursive: true}, (err) => {
    if(err) {
        console.log(Error);
    }
})

fs.readdir(filesFolderWay, {withFileTypes: true}, (err, data) => {
    console.log(data)
    if(err) {
        console.log('error copied')
    }
    else {
        data.forEach(e => {
            const nameFiles = e.name;
            fs.copyFile(`${filesFolderWay}/${nameFiles}`, `${newCopyFolderWay}/${nameFiles}`, () => {});
        });
        console.log('successfully copied') 
    }
});
