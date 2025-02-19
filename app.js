async function main() {
    let pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });

    const codeArea = document.getElementById("code");
    const outputArea = document.getElementById("output");

    codeArea.value = localStorage.getItem("pythonCode") || "";

    codeArea.addEventListener("input", () => {
        localStorage.setItem("pythonCode", codeArea.value);
    });

    document.getElementById("run").onclick = async () => {
        let code = codeArea.value;
        try {
            let output = await pyodide.runPythonAsync(code);
            outputArea.textContent += `\n> ${output}`;
        } catch (err) {
            outputArea.textContent += `\n> ${err}`;
        }
    };

    document.getElementById("consoleRun").onclick = async () => {
        let command = document.getElementById("consoleInput").value;
        try {
            let output = await pyodide.runPythonAsync(command);
            outputArea.textContent += `\n> ${command}\n${output}`;
        } catch (err) {
            outputArea.textContent += `\n> ${command}\n${err}`;
        }
        document.getElementById("consoleInput").value = "";
    };

    document.getElementById("fileInput").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith(".py")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                codeArea.value = e.target.result;
                localStorage.setItem("pythonCode", codeArea.value);
            };
            reader.readAsText(file);
        }
    });
}

main();