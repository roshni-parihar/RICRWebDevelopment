let b = 1,
  c = 1,
  s = 0,
  g = 0,
  i = 0;
 // bl = 0,
  st = 0;

const img = document.getElementById("image");
console.log(img.src);
if (img === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
  document.getElementById("image").style.display = "none";
}

function uploadImage() {
  const file = document.getElementById("Upload").files[0];
  const fileURL = URL.createObjectURL(file);
  
  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("UploadLabel").style.display = "none";
  applyFilter();
}
function applyFilter() {
  document.getElementById("image").style.filter = `brightness(${b})
                                                   contrast(${c})
                                                  
                                                    grayscale(${g}%)
                                                    saturate(${st})
                                                    invert(${i}%)
                                                    sepia(${s}%)`;
}

function changeBrightness() {
  const value = document.getElementById("Brightness").value;
  b = (value * 2) / 100;
  applyFilter();  
}
function changeContrast() {
  const value = document.getElementById("Contrast").value;
  c = (value * 2) / 100;
  applyFilter();
}
function changeGrayscale() {
  const value = document.getElementById("Grayscale").value;
  g = value;
  applyFilter();
}
function changeSepia() {
  const value = document.getElementById("Sepia").value;
  s = value;
  applyFilter();
}
function changeSaturate() {
  const value = document.getElementById("Saturate").value;
  st = value;
  applyFilter();
}
/*function changeHue_rotate() {
  const value = document.getElementById("Hue_rotate").value;
  r = value;
  applyFilter();
}
function changeBlur() {
  const value = document.getElementById("Blur").value;
  bl = value;
  applyFilter();
}*/
function changeInvert() {
  const value = document.getElementById("Invert").value;
  i = value;
  applyFilter();
}
function Reset() {
  b = 1;
  c = 1;
  s = 0;
  g = 0;
  i = 0;
 // bl = 0;
 st = 0;

  applyFilter();
  document.getElementById("Brightness").value = "50";
  document.getElementById("Contrast").value = "50";
  document.getElementById("Sepia").value = "0";
  document.getElementById("Grayscale").value = "0";
 // document.getElementById("Saturate").value = "0";
 // document.getElementById("Blur").value = "0";
  document.getElementById("Invert").value = "0";
}
function download() {
  if (img.src === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
    alert("Please Upload the Image First");
    return;
  }

  if (!img.complete) {
    alert("Image Upload is in Progress. Please wait...");
    return;
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // fetch the originall width & height of the immage
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const filter = getComputedStyle(img).filter;

  ctx.filter = filter === "name" ? "none" : filter;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");

  const anchorTag = document.createElement("a");

  anchorTag.href = dataURL;

  anchorTag.download = "editedImage.png";

  document.body.appendChild(anchorTag);
  anchorTag.click();
  document.body.removeChild(anchorTag);
}
