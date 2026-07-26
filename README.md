# ExtractEPW

Web-based tool for extracting assets.epw out of any WASM-GC based Eaglercraft HTML file.

[https://kinnnine.github.io/extractepw](https://kinnnine.github.io/extractepw)

## Notice

Spaghetti code and bugs are expected to be found here, and not every html files will work with this tool. 

## Tested Eaglercraft HTML files

* EaglercraftX_1.8_u53_WASM-GC_Offline.html<br>expected `assets.epw` sha256: `ecfa438804724de30a871408058b25504746ab14705486cd9ec32855676cc524`
* Eaglercraft_1.12.2_u3_WASM_Offline.html<br>expected `assets.epw` sha256: `6dc65357ddc681ee95ec8623850de6389d746c723fb7329eb3f8746ffcbbafb3`

All assets.epw files should have a valid file header of `|EAG$WASM|`, hexdump output example below.

```
$ hexdump -n 8 -C assets.epw
00000000  45 41 47 24 57 41 53 4d                           |EAG$WASM|
```

## How to use

This tool is very straightforward, press `Choose File`, select valid .html file and then press `Extract & Download`.

## Technologies used

* [Mithril.js](https://mithril.js.org/): JavaScript framework
* [Workbox](https://web.dev/learn/pwa/workbox): Handling asset caching for offline use
* [xterm.js](https://xtermjs.org/): Logging
* [Vite](https://vite.dev/): Web Bundler

## Credits

* [lax1dude](https://github.com/lax1dude): Eaglercraft, inventing EPW file format.

## Copyright and License

This software is created by Supphakit Duanghoy ([kinnnine](https://github.com/kinnnine)), copyright (c) 2026 under [GPLv2](LICENSE) license.