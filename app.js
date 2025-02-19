async function main() {
    let pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });
    document.getElementById("run").onclick = async () => {
        let code = document.getElementById("code").value;
        try {
            let output = await pyodide.runPythonAsync(code);
            document.getElementById("output").textContent = output;
        } catch (err) {
            document.getElementById("output").textContent = err;
        }
    };
}

main();