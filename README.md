# React Image File Resizer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.org/onurzorluer/react-image-file-resizer.svg?branch=master)](https://travis-ci.org/onurzorluer/react-image-file-resizer.svg?branch=master) [![npm version](https://badge.fury.io/js/react-image-file-resizer.svg)](https://badge.fury.io/js/react-image-file-resizer)

`@peacechen/react-image-file-resizer` is a react module that resizes images in the browser.

- You can change image's width, height, format, rotation and quality.
- It returns resized image's new base64 URI, Blob, or File. The URI can be used as the source of an `<Image>` component.

## v1.0.0 Breaking Changes

* This project has been converted to TypeScript with a generated type definition file.
* The main method `imageFileResizer` accepts an options object argument instead of multiple individual arguments.
* It returns a Promise instead of using a callback.

## Publication notes

This fork has been published as `@peacechen/react-image-file-resizer` pending merge into the parent project.

## Setup

Install the package:

```
npm i @peacechen/react-image-file-resizer
```

or

```
yarn add @peacechen/react-image-file-resizer
```

## Usage

```javascript
import { imageFileResizer } from "@peacechen/react-image-file-resizer";

const newImage = await imageFileResizer({
  compressFormat, // the compression format of the resized image.
  file, // the file of the image to resize.
  maxHeight, // the maxHeight of the resized image.
  maxWidth, // the maxWidth of the resized image.
  minHeight // the minHeight of the resized image.
  minWidth, // the minWidth of the resized image.
  outputType, // the output type of the resized image.
  quality, // the quality of the resized image.
  rotation, // the degree of clockwise rotation to apply to uploaded image.
});
```

## Example

```javascript
import React, { useState } from "react";
import { imageFileResizer } from "@peacechen/react-image-file-resizer";

export function App() {
  const [newImage, setNewImage] = useState();

  async function fileChangedHandler(event) {
    let fileInput = event.target.files[0];
    if (fileInput) {
      try {
        const uri = await imageFileResizer({
          compressFormat: "jpeg",
          file: fileInput,
          maxHeight: 300,
          maxWidth: 300,
          minHeight: 200,
          minWidth: 200,
          outputType: "base64"
          quality: 100,
          rotation: 0,
        });
        console.log(uri);
        setNewImage(uri);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={fileChangedHandler} />
        <img src={newImage} alt="" />
      </div>
    );
  }
}

export default App;
```

### Input Argument Object

| Options object    | Description                                                                                                   | Type        | Default | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ----------- | ------- | -------- |
| `compressFormat`  | Image format: **jpeg**, **png** or **webp**.                                                                  | `string`    | "jpeg"  | No       |
| `file`            | Image File                                                                                                    | `File`      |         | Yes      |
| `maxHeight`       | New image max height (ratio is preserved)                                                                     | `number`    |         | Yes      |
| `maxWidth`        | New image max width (ratio is preserved)                                                                      | `number`    |         | Yes      |
| `minHeight`       | New image min height (ratio is preserved unless minHeight === maxHeight)                                      | `number`    |         | No       |
| `minWidth`        | New image min width (ratio is preserved unless minWidth === maxWidth)                                         | `number`    |         | No       |
| `outputType`      | Output type: **base64**, **blob** or **file**.                                                                | `string`    | "base64"| No       |
| `quality`         | A number between 0 and 100. Used for the JPEG compression. (100 = no compression)                             | `number`    | 100     | No       |
| `rotation`        | Degree of clockwise rotation to apply to the image. Rotation is limited to 0, 90, 180, 270. (0 = no rotation) | `number`    | 0       | No       |

### Return

`imageFileResizer` returns a promise that resolves to type `string | File | Blob` depending on the `outputType` option.

## License

[MIT](https://opensource.org/licenses/mit-license.html)

## Publishing

```
npm run build
npm publish
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/AhmadMaleki"><img src="https://avatars2.githubusercontent.com/u/26637638?v=4?s=100" width="100px;" alt="Ahmad Maleki"/><br /><sub><b>Ahmad Maleki</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=AhmadMaleki" title="Code">💻</a> <a href="#maintenance-AhmadMaleki" title="Maintenance">🚧</a></td>
      <td align="center"><a href="http://www.vysnovsky.sk/"><img src="https://avatars1.githubusercontent.com/u/5657185?v=4?s=100" width="100px;" alt="Martin Vyšňovský"/><br /><sub><b>Martin Vyšňovský</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=martinvysnovsky" title="Code">💻</a> <a href="#maintenance-martinvysnovsky" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/nadunc"><img src="https://avatars2.githubusercontent.com/u/22863180?v=4?s=100" width="100px;" alt="Nadun Chamikara"/><br /><sub><b>Nadun Chamikara</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=nadunc" title="Code">💻</a> <a href="#maintenance-nadunc" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://shubhamzanwar.github.io/"><img src="https://avatars0.githubusercontent.com/u/15626155?v=4?s=100" width="100px;" alt="Shubham Zanwar"/><br /><sub><b>Shubham Zanwar</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=shubhamzanwar" title="Documentation">📖</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/onderonur/"><img src="https://avatars0.githubusercontent.com/u/50423574?v=4?s=100" width="100px;" alt="Onur Önder"/><br /><sub><b>Onur Önder</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=onderonur" title="Code">💻</a> <a href="#maintenance-onderonur" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://emreaybey.com/"><img src="https://avatars1.githubusercontent.com/u/45988990?v=4?s=100" width="100px;" alt="Yunus Emre"/><br /><sub><b>Yunus Emre</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=YemreAybey" title="Code">💻</a> <a href="#maintenance-YemreAybey" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/velascojuan/"><img src="https://avatars.githubusercontent.com/u/4591845?v=4?s=100" width="100px;" alt="Juan"/><br /><sub><b>Juan</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=OverStruck" title="Code">💻</a> <a href="#maintenance-OverStruck" title="Maintenance">🚧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://www.facebook.com/sreang.rathanak"><img src="https://avatars.githubusercontent.com/u/12246079?v=4?s=100" width="100px;" alt="Sreang Rathanak"/><br /><sub><b>Sreang Rathanak</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=RathanakSreang" title="Code">💻</a> <a href="#maintenance-RathanakSreang" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/andresriveratoro"><img src="https://avatars.githubusercontent.com/u/36863582?v=4?s=100" width="100px;" alt="Andres Rivera"/><br /><sub><b>Andres Rivera</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=andresriveratoro" title="Code">💻</a> <a href="#maintenance-andresriveratoro" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/mmmulani"><img src="https://avatars.githubusercontent.com/u/192928?v=4?s=100" width="100px;" alt="mmmulani"/><br /><sub><b>mmmulani</b></sub></a><br /><a href="https://github.com/onurzorluer/react-image-file-resizer/commits?author=mmmulani" title="Code">💻</a> <a href="#maintenance-mmmulani" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/Alex-1701"><img src="https://avatars.githubusercontent.com/u/55504833?v=4?s=100" width="100px;" alt="Alex-1701"/><br /><sub><b>Alex-1701</b></sub></a><br /><a href="#maintenance-Alex-1701" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
