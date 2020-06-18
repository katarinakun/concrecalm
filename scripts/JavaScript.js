function check_web_storage_support() {
    if (typeof (Storage) !== "undefined") {
        return (true);
    }
    else {
        alert("Web storage unsupported!");
        return (false);
    }
}
function save() {
    if (check_web_storage_support() == true) {
        var area = document.getElementById("area");
        if (area.value != '') {
            localStorage.setItem("note", area.value);
        }
        else {
            alert("Nothing to save");
        }
    }
}
function display_saved_note() {
    if (check_web_storage_support() == true) {
        result = localStorage.getItem('note');
    }
    if (result === null) {
        result = "No note saved";
    }
    document.getElementById('area').value = result;
}
function onInitFs(fs) {

    fs.root.getFile('log.txt', { create: true }, function (fileEntry) {

        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function (e) {
                console.log('Write completed.');
            };

            fileWriter.onerror = function (e) {
                console.log('Write failed: ' + e.toString());
            };

            var bb = new BlobBuilder();
            bb.append('localStorage');
            fileWriter.write(bb.getBlob('text/plain'));

        }, errorHandler);

    }, errorHandler);

}
function readFile(object) {
    var file = object.files[0]
    var reader = new FileReader()
    reader.onload = function () {
        document.getElementById('out').innerHTML = reader.result
    }
    reader.readAsText(file)
}

setInterval(function() {
  // fuction that is saving the innerHTML of the div
  localStorage["text"] = document.getElementById("editor").innerHTML; // content div
}, 1000);