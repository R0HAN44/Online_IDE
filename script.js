const runButton = document.getElementById("runButton");
const inputArea = document.getElementById("input");
const outputArea = document.getElementById("output");

let input = "";
let code = "";
let time_used;
let memory_used;
let status_detail;
let output_url;
let language = "C";
let delay = 4000;
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "text/x-c++src",
  theme: "3024-night",
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  keyMap: "sublime",
  extraKeys: { "Ctrl-Space": "autocomplete" },
  scrollbarStyle: "overlay",
});
editor.setSize("70vw", "80vh");
const url =
  "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/";
const compileCode = async () => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "client-secret": "61a02a00f6be54a02a0bebbe3c392e5c6c921691",
    },
    body: JSON.stringify({
      lang: language,
      source: code,
      input: input,
      memory_limit: 243232,
      time_limit: 5,
      callback: "https://client.com/callback/execute/result/",
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const status_url = data.status_update_url;
  const client_secret = "61a02a00f6be54a02a0bebbe3c392e5c6c921691";
  const headers = {
    "client-secret": client_secret,
  };
  let response2 = await fetch(status_url, { headers });
  let ans = await response2.json();
  let interval = setInterval(async () => {
    response2 = await fetch(status_url, { headers });
    ans = await response2.json();

    if (ans.request_status.code === "REQUEST_COMPLETED") {
      time_used = ans.result.run_status.time_used;
      memory_used = ans.result.run_status.memory_used;
      status_detail = ans.result.run_status.status;
      output_url = ans.result.run_status.output;
      displayOutput();
      clearInterval(interval);
    } else if (ans.request_status.code === "REQUEST_FAILED") {
      clearInterval(interval);
    }
  }, 3000);
};

const displayOutput = () => {
  if (status_detail == "AC") {
    document.getElementById("status_detail").innerText =
      "Accepted. The code executed successfully.";
  } else if (status_detail == "MLE") {
    document.getElementById("status_detail").innerText =
      "Memory Limit Exceeded. Execution of the compiled code used more memory that the memory limit";
  } else if (status_detail == "TLE") {
    document.getElementById("status_detail").innerText =
      "Time Limit Exceeded. Execution of the compiled code took more time than the passed time limit";
  } else if (status_detail == "RE") {
    document.getElementById("status_detail").innerText =
      "Invalid memory reference or segmentation fault";
  }

  document.getElementById("time_used").innerText = `Time Used : ${time_used} s`;
  document.getElementById(
    "memory_used"
  ).innerText = `Memory Used : ${memory_used} KB`;
  document.getElementById("download_button").setAttribute("href", output_url);
};

runButton.addEventListener("click", () => {
  code = editor.getValue();
  input = inputArea.value.toString();
  if (code == "") {
    alert("Enter the code");
  } else {
    document.getElementById("status_detail").innerText = "Executing Code....";
    document.getElementById("time_used").innerText = "";
    document.getElementById("memory_used").innerText = "";
    compileCode();
  }
});

var option = document.getElementById("Language");
option.addEventListener("change", () => {
  if (option.value == "java") {
    editor.setOption("mode", "text/x-java");
    language = "JAVA14";
  } else if (option.value == "python") {
    editor.setOption("mode", "text/x-python");
    language = "PYTHON3";
  } else if (option.value == "cpp") {
    editor.setOption("mode", "text/x-c++src");
    language = "CPP17";
  } else {
    editor.setOption("mode", "text/x-c++src");
    language = "C";
  }
});

let themes = document.getElementById("theme");
themes.addEventListener("change", () => {
  editor.setOption("theme", themes.value);
});
