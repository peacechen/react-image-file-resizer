/**
 *
 * @author Onur Zorluer
 *
 */

interface MaxArgs {
  maxHeight: number
  maxWidth: number
  minHeight?: number
  minWidth?: number
}

interface ChangeHeightWidthArgs extends MaxArgs {
  height: number
  width: number
}

function changeHeightWidth(args: ChangeHeightWidthArgs) {
  const {
    height: argHeight,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width: argWidth,
  } = args;

  if (maxHeight === minHeight && maxWidth === minWidth) {
    // Respect fixed dimensions
    return { height: maxHeight, width: maxWidth };
  }

  let height = argHeight;
  let width = argWidth;
  // Resize while preserving aspect ratio
  if (argWidth > maxWidth) {
    height = Math.round((argHeight * maxWidth) / argWidth);
    width = maxWidth;
  }
  else if (minWidth && argWidth < minWidth) {
    height = Math.round((argHeight * minWidth) / argWidth);
    width = minWidth;
  }

  if (argHeight > maxHeight) {
    width = Math.round((argWidth * maxHeight) / argHeight);
    height = maxHeight;
  }
  else if (minHeight && argHeight < minHeight) {
    width = Math.round((argWidth * minHeight) / argHeight);
    height = minHeight;
  }
  return { height, width };
}

interface ResizeAndRotateArgs extends MaxArgs {
  compressFormat?: "jpeg" | "png" | "webp",
  quality?: number
  rotation?: 0 | 90 | 180 | 270
}

interface ResizeAndRotateImageArgs extends ResizeAndRotateArgs {
  image: HTMLImageElement
}

function resizeAndRotateImage(args: ResizeAndRotateImageArgs) {
  const {
    compressFormat = "jpeg",
    image,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    quality = 100,
    rotation,
  } = args;

  var qualityDecimal = quality / 100;
  var canvas = document.createElement("canvas");

  var width = image.width;
  var height = image.height;

  var newHeightWidth = changeHeightWidth({
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
  });
  if (rotation && (rotation === 90 || rotation === 270)) {
    canvas.width = newHeightWidth.height;
    canvas.height = newHeightWidth.width;
  } else {
    canvas.width = newHeightWidth.width;
    canvas.height = newHeightWidth.height;
  }

  width = newHeightWidth.width;
  height = newHeightWidth.height;

  var ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create canvas");
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
    ctx.imageSmoothingQuality = 'high';
  }

  if (rotation) {
    ctx.rotate((rotation * Math.PI) / 180);
    if (rotation === 90) {
      ctx.translate(0, -canvas.width);
    } else if (rotation === 180) {
      ctx.translate(-canvas.width, -canvas.height);
    } else if (rotation === 270) {
      ctx.translate(-canvas.height, 0);
    } else if (rotation === 0 || rotation === 360) {
      ctx.translate(0, 0);
    }
  }
  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
}

function b64toByteArrays(b64Data: string, contentType: string) {
  contentType = contentType || "image/jpeg";
  var sliceSize = 512;

  var byteCharacters = atob(
    b64Data.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")
  );
  var byteArrays: Uint8Array[] = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  return byteArrays;
}

function b64toBlob(b64Data: string, contentType: string) {
  const byteArrays = b64toByteArrays(b64Data, contentType);
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

function b64toFile(b64Data: string, fileName: string, contentType: string) {
  const byteArrays = b64toByteArrays(b64Data, contentType);
  const file = new File(byteArrays, fileName, { type: contentType });
  return file;
}

export interface ImageFileResizerArgs extends ResizeAndRotateArgs {
  file: File
  outputType?: "base64" | "blob" | "file"
}

export async function imageFileResizer(args: ImageFileResizerArgs): Promise<string | File | Blob> {
  const {
    compressFormat = "jpeg",
    file,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    outputType = "base64",
    quality = 100,
    rotation = 0,
  } = args;

  const reader = new FileReader();
  if (file) {
    if (file.type && !file.type.includes("image")) {
      throw Error("File Is NOT Image!");
    } else {
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          var image = new Image();
          image.src = reader.result as string;
          image.onload = function () {
            var resizedDataUrl = resizeAndRotateImage({
              compressFormat,
              image,
              maxHeight,
              maxWidth,
              minHeight,
              minWidth,
              quality,
              rotation,
            });
            const contentType = `image/${compressFormat}`;
            switch (outputType) {
              case "blob":
                const blob = b64toBlob(resizedDataUrl, contentType);
                resolve(blob);
              break;
              case "file":
                let fileName = file.name;
                let fileNameWithoutFormat = fileName.toString().replace(/(png|jpeg|jpg|webp)$/i, "");
                let newFileName = fileNameWithoutFormat.concat(compressFormat.toString());
                const newFile = b64toFile(resizedDataUrl, newFileName, contentType);
                resolve(newFile);
              break;
              case "base64":
              default:
                resolve(resizedDataUrl);
            }
          };
        };
        reader.onerror = (error) => {
          throw Error(JSON.stringify(error));
        };
      });
    }
  } else {
    throw Error("File Not Found!");
  }
}
