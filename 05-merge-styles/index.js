let fs = require('fs');
let path = require('path');
const wayOfFolderStyles = path.join(__dirname, 'styles'); 
const wayOfFolderProject = path.join(__dirname, 'project-dist', 'bundle.css');
const writeOfBundle = new fs.WriteStream(wayOfFolderProject);

fs.readdir(wayOfFolderStyles, {withFileTypes: true}, (err,data) => {
    if (err) {
        console.log(error);
    }
    else {
        data.forEach((e) => {
            const extArray = e.name.split('.');
            const ext = extArray[extArray.length-1];
            if(ext === 'css' && e.isFile()) {
                const wayOfFolderStylesFile = path.join(__dirname, 'styles', `${e.name}`); 
                fs.readFile(wayOfFolderStylesFile, {encoding: 'utf-8'}, (err, dataReadFile) => {
                    if(err) {
                        console.log('error of readFile');
                    }
                    else {
                       let arrayStyles = [];
                       arrayStyles.push(dataReadFile);
                        writeOfBundle.write(arrayStyles.toString());    
                    };
                });      
            };
        });
    };
});
console.log('complied')



