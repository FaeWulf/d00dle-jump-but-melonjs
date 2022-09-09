## Pics
![main-menu](https://raw.githubusercontent.com/FaeWulf/d00dle-jump-but-melonjs/main/pics/unnamed%20(2).png)
![ingame](https://raw.githubusercontent.com/FaeWulf/d00dle-jump-but-melonjs/main/pics/unnamed%20(1).png)
![win](https://raw.githubusercontent.com/FaeWulf/d00dle-jump-but-melonjs/main/pics/unnamed%20(3).png)
## Prerequisites

Ensure you have [Node.js](http://nodejs.org/) installed, then install all the build dependencies in the folder where you cloned the repository :

    $ [sudo] npm install

## Usage

- `npm run dev` to start the dev server on watch mode at `localhost:9000`.
- `npm run build` to generate a minified, production-ready build, in the `public` folder

if everything goes well, on running the dev server for the first time you should see this :
![boilerplate-helloworld](https://user-images.githubusercontent.com/4033090/134762171-6e1fac3d-8b41-4665-890b-daa217ba61dc.png)

> Note: when generating the production build, Webpack will attempt to filter files under the data folder to only copy final assets and ignore project files (e.g. .ftpp project files from Free Texture Packer). If you find your file being wrongly ignore you can easily add the corresponding extension in the [webpack.config.js](webpack.config.js) file

## Folder structure

```none
src
└── data
│    ├── bgm
│    ├── fnt
|    ├── img
|    ├── map
|    └── sfx
└── js
|    ├── renderables
|    └── stage
├── index.js
├── index.css
├── index.html
├── manifest.js
public
├── data
├── bundle.js
└── index.html
```

- `src`
  - the root folder for your game source code
  - The entry file is [index.js](src/index.js).
  - [index.css](src/index.css) and [index.html](src/index.html) are default templates that can be customized
  - [manifest.js](src/manifest.js) is a list of asset to be preloaded by melonJS (these won't be automatically imported and bundled by webpack)
- `src/js`
  - add your source classes here
- `src/data`
  - where to add your game assets
- `public`
  - where the production-ready build files will be copied/generated when using `npm run build`

Debug plugin
-------------------------------------------------------------------------------
In development mode, the boilerplate will automatically register and instantiate the melonJS Debug Plugin
![debug-panel](https://user-images.githubusercontent.com/4033090/138006717-cf3165a4-a52d-4855-a7c7-16b2a09ed124.png)


Questions, need help ?
-------------------------------------------------------------------------------
If you need technical support, you can contact us through the following channels :
  - [melonJS developer forum](http://www.html5gamedevs.com/forum/32-melonjs/)
  - [gitter web chat](https://gitter.im/melonjs/public)
  - [melonJS wikipage](https://github.com/melonjs/melonJS/wiki)
  - [Discord](https://discord.gg/aur7JMk)

For any other non technical related questions, feel free to also send us an [email](mailto:contact@melonjs.org).
