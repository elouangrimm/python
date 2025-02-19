async function main() {
    let pyodide = await loadPyodide();
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