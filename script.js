window.onload = function () {
    const canvas = document.getElementById("signature-pad");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("clear");
    const saveButton = document.getElementById("save");
    const signatureImage = document.getElementById("signature-image");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mouseout", () => isDrawing = false);

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    clearButton.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        signatureImage.style.display = "none";
    });

    saveButton.addEventListener("click", () => {
        const dataURL = canvas.toDataURL("image/png");
        signatureImage.src = dataURL;
        signatureImage.style.display = "block";
    });
};
