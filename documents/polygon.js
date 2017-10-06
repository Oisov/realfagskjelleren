function drawConnected(listQ, canvasQ) {

    const list = document.querySelector(listQ);
    if (list === null) {
        console.warn("Could not find list '" + listQ + "'");
        return;
    }

    const canvas = document.querySelector(canvasQ);
    if (canvas === null) {
        console.warn("Could not find canvas '" + canvasQ + "'");
        return;
    }

    const ctx = canvas.getContext("2d");

    const size = 512; // Generic size. This is scaled to fit the canvas
    const xScale = canvas.width / size;
    const yScale = canvas.height / size;

    // get settings or use dsefault
    const settings = Object.assign({
        fontSize: 16,
        lineWidth: 128,
        lineDash: 4,
        textColor: "White",
        lineColor: "#F90", // orange
        startAngle: -Math.PI / 2,
        font: "arial",
    }, list.dataset);

    // calculate relative sizes. convert deg to randians
    const fontSize = size / Number(settings.fontSize) | 0; // (| 0 floors the value)
    const lineWidth = size / Number(settings.lineWidth) | 0;
    const lineDash = lineWidth * Number(settings.lineDash);
    const startAngle = Number(settings.startAngle) * Math.PI / 180; // -90 deg is top of screen

    // get text in all the list items
    const items = [...list.querySelectorAll("li")].map(element => element.textContent);

    // Set up the canvas
    // Scale the canvas content to fit.
    ctx.setTransform(xScale, 0, 0, yScale, 0, 0);
    ctx.clearRect(0, 0, size, size); // clear as canvas may have content
    ctx.font = fontSize + "px " + settings.font;

    // align text to render from its center
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // set the line details
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.setLineDash([lineDash, lineDash]);

    // need to make room for text so calculate all the text widths
    const widths = [];
    for (let i = 0; i < items.length; i++) {
        widths[i] = ctx.measureText(items[i]).width;
    }

    // use the max width to find a radius that will fit all text
    const maxWidth = Math.max(...widths);
    const radius = (size / 2 - maxWidth * 0.6);

    // this function returns the x y position on the circle for item at pos
    const getPos = (pos) => {
        const ang = pos / items.length * Math.PI * 2 + startAngle;
        return [
            Math.cos(ang) * radius + size / 2,
            Math.sin(ang) * radius + size / 2
        ];
    };

    // draw lines first
    ctx.strokeStyle = settings.lineColor;
    ctx.beginPath();
    for (let i = 0; i < items.length; i++) {
        const [x, y] = getPos(i);
        for (let j = i + 1; j < items.length; j++) {
            const [x1, y1] = getPos(j);
            ctx.moveTo(x, y);
            ctx.lineTo(x1, y1);
        }
    }
    ctx.stroke();

    // draw text
    ctx.fillStyle = settings.textColor;
    for (let i = 0; i < items.length; i++) {
        const [x, y] = getPos(i);
        ctx.clearRect(x - widths[i] * 0.6, y - fontSize * 0.6, widths[i] * 1.2, fontSize * 1.2);
        ctx.fillText(items[i], x, y);
    }

    // restore default transform;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// draw the diagram with selector query for ordered list and canvas
drawConnected("#poly", "#polygon");
