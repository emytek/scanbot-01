// import { useState, useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const ScannerBot: React.FC = () => {
//   const [result, setResult] = useState<string | null>(null);
//   const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo | null>(null);

//   useEffect(() => {
//     const reader = new BrowserMultiFormatReader();
//     async function init() {
//       const videoDevices = await reader.listVideoInputDevices();
//       if (videoDevices.length > 0) {
//         setVideoDevice(videoDevices[0]);
//       }
//     }

//     init();
//   }, []);

//   useEffect(() => {
//     if (videoDevice) {
//       const reader = new BrowserMultiFormatReader();
//       reader.decodeFromVideoDevice(videoDevice.deviceId, "video", (result) => {
//         if (result) {
//           setResult(result.getText());
//         }
//       });
//     }
//   }, [videoDevice]);

//   return (
//     <>
//       {result ? <p>Scanned code: {result}</p> : <p>Scanning...</p>}
//       <video id="video" width="600" height="400" />
//     </>
//   );
// };

// export default ScannerBot;



import { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const ScannerBot: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [videoDeviceId, setVideoDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();

    async function init() {
      try {
        const videoDevices = await reader.listVideoInputDevices();
        console.log("Available Cameras:", videoDevices);

        if (videoDevices.length > 0) {
          // Try selecting the back camera
          const backCamera = videoDevices.find((device) =>
            device.label.toLowerCase().includes("back")
          );

          if (backCamera) {
            console.log("Using Back Camera:", backCamera.label);
            setVideoDeviceId(backCamera.deviceId);
          } else {
            console.log("Back camera not found, using default:", videoDevices[0].label);
            setVideoDeviceId(videoDevices[0].deviceId);
          }
        } else {
          console.warn("No video input devices found.");
        }
      } catch (error) {
        console.error("Error listing video input devices:", error);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (videoDeviceId) {
      const reader = new BrowserMultiFormatReader();
      reader.decodeFromVideoDevice(videoDeviceId, "video", (result) => {
        if (result) {
          console.log("Scanned Result:", result.getText());
          setResult(result.getText());
        }
      });
    }
  }, [videoDeviceId]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-4">Barcode Scanner</h2>
      <video id="video" className="border rounded-lg shadow-lg w-[600px] h-[400px]" />
      <p className="mt-4 text-lg">
        {result ? `Scanned Code: ${result}` : "Scanning..."}
      </p>
    </div>
  );
};

export default ScannerBot;









