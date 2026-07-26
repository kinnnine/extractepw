import m from "mithril";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

export const App = () => {
    return {
        oninit: (vnode) => {
            vnode.state.term = new Terminal();
            vnode.state.inputFile = "";
            vnode.state.download = (filename, content) => {
                vnode.state.log('Downloading...');
                const blob = new Blob([content], { type: 'application/octet-stream' });
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
            }
            vnode.state.run = () => {
                vnode.state.term.clear();
                vnode.state.log('');
                if (vnode.state.inputFile) {
                    let file = vnode.state.inputFile;
                    vnode.state.log('Filename: ' + file.name);
                    vnode.state.log('Type: ' + file.type);
                    vnode.state.log('Size: ' + file.size);
                    vnode.state.log('');
                    const reader = new FileReader();
                    vnode.state.log('Reading HTML content...');
                    reader.onload = function (e) {
                        let match = "window.eaglercraftXOpts.assetsURI";
                        vnode.state.log('Loaded HTML content...');
                        const text = e.target.result;
                        const lines = text.split(/\r?\n/);
                        const matched = lines
                            .filter(line => line.includes(match))
                            .reduce((longest, current) => {
                                return current.length > longest.length ? current : longest;
                            }, "");
                        vnode.state.log('');
                        if (matched) {
                            vnode.state.log('Found matched string, parsing...');
                            let match = 'window.eaglercraftXOpts.assetsURI="data:application/octet-stream;base64,';
                            let p1 = matched.replaceAll(" ", "");
                            let p2 = p1.replaceAll('\t', "");
                            let p3 = p2.replaceAll(match, "");
                            let p4 = p3.replaceAll('";', "");
                            vnode.state.log('')
                            vnode.state.log('Decoding base64 data into actual file...')
                            let decoded = atob(p4);
                            let len = decoded.length;
                            let data = new Uint8Array(len);
                            for (let i = 0; i < len; i++) {
                                data[i] = decoded.charCodeAt(i);
                            };
                            vnode.state.log('');
                            vnode.state.download("assets.epw", data);
                        } else {
                            vnode.state.log('Match string not found, aborted.');
                        }
                    };
                    reader.readAsText(file);
                } else {
                    vnode.state.log('Error: Input file is empty, aborted.');
                };
                vnode.state.log('');
            };
        },
        oncreate: (vnode) => {
            const fitAddon = new FitAddon();
            vnode.state.term.loadAddon(fitAddon);
            vnode.state.term.open(document.getElementById('terminal'));
            fitAddon.fit();
            vnode.state.log = (string) => {
                vnode.state.term.write(string + '\r\n');
            };
        },
        view: (vnode) => {
            return (
                <>
                    <h1>ExtractEPW</h1>
                    <pre>Extract assets.epw from WASM-GC Ealgercraft HTML file, spaghetti code and bugs are expected to be found.<br></br>
                    Tested Eaglercrafts HTML files:<br></br>
                    - EaglercraftX_1.8_u53_WASM-GC_Offline.html (expected assets.epw sha256: ecfa438804724de30a871408058b25504746ab14705486cd9ec32855676cc524)<br></br>
                    - Eaglercraft_1.12.2_u3_WASM_Offline.html (expected assets.epw sha256: 6dc65357ddc681ee95ec8623850de6389d746c723fb7329eb3f8746ffcbbafb3)<br></br>
                    All assets.epw files should have a valid file header of "|EAG$WASM|", hexdump output example below.<br></br>
                    <br></br>
                    $ hexdump -n 8 -C assets.epw<br></br>
                    00000000  45 41 47 24 57 41 53 4d                           |EAG$WASM|
                    </pre>
                    <a href="https://github.com/kinnnine/extractepw">GitHub</a>
                    <hr></hr>
                    <input type="file" accept=".html" onchange={(e) => {
                        vnode.state.inputFile = e.target.files[0];
                    }}>
                    </input>
                    <button style="margin-right:10px;margin-left:10px;" onclick={() => vnode.state.run()}>Extract & Download</button>
                    <br></br><br></br>
                    <div style="width:100%;height:100%;max-width:850px;">
                        <div id="terminal"></div>
                    </div>
                </>
            )
        }
    };
};