
const fs = require('fs');
const path = require('path');
const filesFolderWay = path.join(__dirname, 'files')
const newCopyFolderWay = path.join(__dirname, 'files-copy');

 fs.rmdir(newCopyFolderWay, { recursive: true}, ()=>{

    fs.mkdir(newCopyFolderWay,{recursive: true}, ()=>{})

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
    })
 })

    
    
    

    


