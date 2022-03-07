
// #!/usr/bin/env node;
// Shebang syntax
// taking input
let fs = require("fs");
let path = require("path");
let treePath = require("./tree")
let helpObj = require("./help");
let organizePath = require("./organize")
let inputArr = process.argv.slice(2);


let command = inputArr[0];
let types = {
    media: ["mp3","mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz','ar', 'iso', 'xz'],
    images: ['jpg','jpeg','png'],
    documents: ['docs', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp','odg', 'odf', 'txt', 'tex', 'ps'],
    app: ['lnk','exe', 'dmg', 'pkg', 'deb']
}



switch(command){
    case "tree":
        treePath.treeObj(inputArr[1]);
        break;
    case "organize":
        organizePath.organizeKey((inputArr[1]));
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Enter the correct value");
        break;            
}

