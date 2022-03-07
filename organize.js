
let fs = require("fs");
let path = require("path");
function organizeFn(dirPath){
    // console.log("organize command executed", dirPath);
    
    //  1. input - > dir path given
    let destPath;
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    }else {
      let doesExist = fs.existsSync(dirPath);
      if(doesExist){
          // 2. create organize file -. directory 
          destPath =  path.join(dirPath, "organised_files");
          if(fs.existsSync(destPath) == false){
            fs.mkdirSync(destPath);
          } 
    
          
      } else{
          console.log("Enter the correct path");
          return;
      } 

    }

    organizeHelper(dirPath, destPath);

    
}
let types = {
    media: ["mp3","mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz','ar', 'iso', 'xz'],
    images: ['jpg','jpeg','png'],
    documents: ['docs', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp','odg', 'odf', 'txt', 'tex', 'ps'],
    app: ['lnk','exe', 'dmg', 'pkg', 'deb']
}

function organizeHelper(folder, dest){
    
    //  3.  check all files categories in that directory 
    let read = fs.readdirSync(folder);
    // console.log(read);
    
    for(let i = 0; i < read.length; i++){
        let pathJoin = path.join(folder, read[i]);
        let filetype = fs.lstatSync(pathJoin).isFile();
        if(filetype){
            // console.log(read[i]);
            let ct = getCategory(read[i]);
            console.log(read[i], "belongs to --> ", ct);
            
            // 4. copy / cut files to organize directory
            sendFile(pathJoin, dest, ct );

        }
    }

}

function sendFile(srcFilePath, dest, ct){
        let categoryPath = path.join(dest, ct);
        if(fs.existsSync(categoryPath) == false){
            fs.mkdirSync(categoryPath);
        }

        let fileName = path.basename(srcFilePath);
        let destFilePath = path.join(categoryPath, fileName)
        fs.copyFileSync(srcFilePath, destFilePath);
        fs.unlinkSync(srcFilePath);
}




function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let currArrayVal = types[type];
        for(let i = 0; i < currArrayVal.length; i++){
          if(ext == currArrayVal[i]){
              return type; 
          }
        }  
    }
    return "others" 
}

module.exports = {
    organizeKey: organizeFn
}