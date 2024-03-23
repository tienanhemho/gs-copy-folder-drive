function myFunction() {
    Logger.log("Hi there"); 
    return "Hello, world!"; 
}
function start1() {
  var folder = DriveApp.getFolderById("1_oG9T3LvNYZWLz1CBY0U4cVoPHOD0KqC").getFiles();
  Logger.log("123");
  while(folder.hasNext()) {
    var file = folder.next();
    Logger.log(file.getName() + "|" + file.getSize() + "|" + file.getMimeType() + "|" + (file.getLastUpdated()< (new Date())?"Dung":"sai"));
  }
}

function sync_folder() {

  var sourceFolder = "1KD9BQF_lF9P9Tkj9dq9DLMSEdFshDjog";
  var targetFolder = "1JJVvVuo_TmsFNVJa2Tbk0tiZkHtKqd8E";

  var source = DriveApp.getFolderById(sourceFolder);
  var target = DriveApp.getFolderById(targetFolder);
  if (source.getName() == target.getName()){
    copyFolder(source, target);
  }
}

function copyFolder(source, target) {

  var sourceFolders = source.getFolders();
  var sourceFiles   = source.getFiles();
  var targetFolders = target.getFolders();
  var targetFiles  = target.getFiles();
  var targetObjFiles = [];
  var targetObjFolders = [];
  
  while(targetFiles.hasNext()) {
    let file = targetFiles.next();
    let fileObj = {
      id: file.getId(),
      name: file.getName(),
      size: file.getSize(),
      lastUpdated: file.getLastUpdated()
    }
    targetObjFiles.push(fileObj);
  }
  while(targetFolders.hasNext()) {
    let subFolder = targetFolders.next();
    let folderObj = {
      id: subFolder.getId(),
      name: subFolder.getName(),
      lastUpdated: subFolder.getLastUpdated()
    }
    targetObjFolders.push(folderObj);
  }
  
  
  while(sourceFiles.hasNext()) {
    let file = sourceFiles.next();
    if (file.getMimeType() == "image/jpeg" || file.getMimeType() == "image/png") continue;
    let found = targetObjFiles.find(element => element.name == file.getName());
    if (found){ 
      if (found.lastUpdated > file.getLastUpdated()) continue;
      if (found.size != 0 && found.size == file.getSize()) continue;
      DriveApp.getFileById(found.id).setTrashed(true);
    }
    file.makeCopy(file.getName(), target);
  }

  while(sourceFolders.hasNext()) {
    let subFolder = sourceFolders.next();
    let folderName = subFolder.getName();
    let found = targetObjFolders.find(element => element.name == folderName);
    if (found){
      var targetFolder = DriveApp.getFolderById(found.id);
    }else{
      var targetFolder = target.createFolder(folderName);
    }
    copyFolder(subFolder, targetFolder);
  }

}