"use strict";

const imagekit = new ImageKit({
  publicKey: "your_public_key",
  urlEndpoint: "your_url_endpoint", // https://ik.imagekit.io/your_imagekit_id
  authenticationEndpoint: "http://localhost:3000/signature",
});

const postForm = getElementById("postForm");
const imagePreview = getElementById("postFOrm");
const imageInput = getElementById("imageInput");

const fileTypes = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

postForm.addEventListener("submit", upload);
// Upload function internally uses the ImageKit.io javascript SDK

imageInput.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = imageInput.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

function upload(e) {
  e.preventDefault();
  imagekit.upload(
    {
      file: imageInput.files[0],
      fileName: imageInput.files[0].name || "image.jpg",
    },
    function (err, result) {
      if (err) {
        alert("Error in file upload. Check console logs for error response");
        console.log(err);
      } else {
        alert("File uploaded. Check console logs for success response");
        console.log(result);
      }
    }
  );
}

function validFileType(file) {
  return fileTypes.includes(file.type);
}
function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}
