
let fs = require("fs");
let path = require("path");
function treeFn(dirPath){
    // let destPath;
    if(dirPath == undefined){
        treeHelper(process.cwd(), "")
        console.log("Kindly enter the path");
        return;
    }else {
      let doesExist = fs.existsSync(dirPath);
      if(doesExist){
          treeHelper(dirPath, "");

      }else{
          console.log("Enter the current path");
          return;
      } 
    }  
}

function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
            let fileName = path.basename(dirPath)
            console.log(indent + "├──" + fileName);
    }else{
        let dirName  = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let children = fs.readdirSync(dirPath);
        for(let child = 0; child < children.length; child++){
            let childPath = path.join(dirPath, children[child]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeObj: treeFn
}