let htmleditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
  mode: "text/html",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  autoCloseTags: true,
  closeTag: true,
  matchTags: true,
  keyMap: "sublime",
  scrollbarStyle: "overlay",
});
htmleditor.setSize("100%", "28%");

let csseditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
  mode: "text/css",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  autoCloseTags: true,
  closeTag: true,
  matchTags: true,
  keyMap: "sublime",
  scrollbarStyle: "overlay",
});
csseditor.setSize("100%", "28%");

let jseditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
  mode: "text/javascript",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  autoCloseTags: true,
  closeTag: true,
  matchTags: true,
  keyMap: "sublime",
  scrollbarStyle: "overlay",
});

jseditor.setSize("100%", "28%");
htmleditor.setValue("");
csseditor.setValue("");
jseditor.setValue("");
htmleditor.setValue(localStorage.getItem("htmlcode"));
csseditor.setValue(localStorage.getItem("csscode"));
jseditor.setValue(localStorage.getItem("jscode"));

htmleditor.on("change", function () {
  run();
});
csseditor.on("change", function () {
  run();
});
jseditor.on("change", function () {
  run();
});

let themes = document.getElementById("theme");
themes.addEventListener("change", () => {
  htmleditor.setOption("theme", themes.value);
  csseditor.setOption("theme", themes.value);
  jseditor.setOption("theme", themes.value);
});

function run() {
  let htmlCode = htmleditor.getValue();
  localStorage.setItem("htmlcode", htmlCode);
  let cssCode = csseditor.getValue();
  localStorage.setItem("csscode", cssCode);
  let jsCode = jseditor.getValue();
  localStorage.setItem("jscode", jsCode);
  let output = document.getElementById("output");
  output.contentDocument.body.innerHTML =
    htmlCode + `<style>${cssCode}</style>`;
  output.contentWindow.eval(jsCode);
}
run();
