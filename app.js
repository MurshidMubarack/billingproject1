
const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({ video: true })
	.then(function (stream) {
		video.srcObject = stream;
		video.play();
	})
	.catch(function (error) {
		console.error("Could not access camera: ", error);
	});
    const config = {
        inputStream: {
            type: "LiveStream",
            target: video,
        },
        decoder: {
            readers: ["ean_reader", "upc_reader"],
        },
    };
    
    Quagga.init(config, function (err) {
        if (err) {
            console.error("Error initializing Quagga: ", err);
            return;
        }
        console.log("Quagga initialized.");
    
        Quagga.start();
    });
    Quagga.onProcessed(function (result) {
        const code = result.codeResult.code;
        console.log("Barcode detected: ", code);
    });
    
    Quagga.onDetected(function (result) {
        const code = result.codeResult.code;
        console.log("Barcode found: ", code);
        // Do something with the barcode data, such as sending it to a server
    });
        