window.onload = function () {
    const canvas = document.getElementById("signature-pad");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("clear");
    const saveButton = document.getElementById("save");
    const signatureImage = document.getElementById("signature-image");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Canvas 크기 설정
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 마우스 좌표 계산 함수
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        const pos = getMousePos(e);
        [lastX, lastY] = [pos.x, pos.y];
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        const pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        [lastX, lastY] = [pos.x, pos.y];
    });

    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mouseout", () => isDrawing = false);

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
