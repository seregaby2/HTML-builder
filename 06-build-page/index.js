const fs = require('fs');
const path = require('path');
const wayBuildFolder = path.join(__dirname, 'project-dist');
const wayBuildFolderAsset = path.join(__dirname, 'project-dist', 'assets');
const wayAssets = path.join(__dirname, 'assets');
const wayOfFolderStyles = path.join(__dirname, 'styles');
fs.mkdir(wayBuildFolder,{recursive: true},() => {});
const wayOfFolderProject = path.join(__dirname, 'project-dist', 'style.css');
const wayOfFolderProjectHTML = path.join(__dirname, 'project-dist', 'index.html');
const writeOfBundle = new fs.WriteStream(wayOfFolderProject);
const writeOfHTML = new fs.WriteStream(wayOfFolderProjectHTML);
const wayTemplate = path.join(__dirname, 'template.html');

const wayComponents = path.join(__dirname, 'components');


fs.readdir(wayAssets, {withFileTypes: true}, (err, data) => {
    if(err) {
        console.log('error copied')
    }
    else {
        fs.mkdir(wayBuildFolderAsset,{recursive: true},() => {});
        data.forEach(e => {
            console.log(e.name)
            const nameDirectory = e.name;
            if(e.isDirectory()) {
                const wayBuildFolderAssets = path.join(wayBuildFolderAsset, nameDirectory)
                fs.mkdir(wayBuildFolderAssets, {recursive: true}, () => {})
            }

            fs.readdir(`${wayAssets}/${nameDirectory}`, {withFileTypes: true}, (err, data) => {
                if(err) {
                    console.log('error copied')
                }
                else {
                    data.forEach(file => {
                        const nameFiles = file.name;
                        if(file.isFile()) {
                            fs.copyFile(`${wayAssets}/${nameDirectory}/${nameFiles}`, `${wayBuildFolderAsset}/${nameDirectory}/${nameFiles}`, () => {});
                        }
                    })
                }
                
            })
        })
    }
});


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


fs.readFile(wayTemplate, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        console.log('error of readFile');
    }
    else {
            const templateTag = data.match(/{{(.*)}}/gi);
            let newHTMLHeader = data.toString()
                for(let i of templateTag) {
                    let tagName = i.slice(2,i.length-2)
                    fs.readFile(path.join(wayComponents, `${tagName}.html`), {encoding: 'utf-8'}, (err,data)=>{
                        if(err) {
                            console.log(err)
                        }
                        else {
                        newHTMLHeader = newHTMLHeader.replace(i,data.toString())
                        
                        fs.writeFile(wayOfFolderProjectHTML,newHTMLHeader.toString(), ()=>{})
                        }
                    })    
                }
        }
    }
)
