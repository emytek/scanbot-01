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
//       {result ? <p>Scanned code: {result}</p> : <p>Scanning</p>}
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

        if (videoDevices.length > 0) {
          // Attempt to find the back camera (environment facing)
          const backCamera = videoDevices.find((device) =>
            device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("environment")
          );

          setVideoDeviceId(backCamera ? backCamera.deviceId : videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing camera devices: ", error);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (videoDeviceId) {
      const reader = new BrowserMultiFormatReader();

      reader.decodeFromVideoDevice(videoDeviceId, "video", (result) => {
        if (result) {
          setResult(result.getText());
        }
      });

      return () => {
        reader.reset();
      };
    }
  }, [videoDeviceId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Scan a Barcode</h2>
      {result ? (
        <p className="text-green-600 font-bold text-lg">Scanned Code: {result}</p>
      ) : (
        <p className="text-gray-500">Scanning...</p>
      )}
      <video id="video" className="w-full max-w-md border border-gray-300 rounded-md" />
    </div>
  );
};

export default ScannerBot;



