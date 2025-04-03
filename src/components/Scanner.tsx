import { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const ScannerBot: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    async function init() {
      const videoDevices = await reader.listVideoInputDevices();
      if (videoDevices.length > 0) {
        setVideoDevice(videoDevices[0]);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (videoDevice) {
      const reader = new BrowserMultiFormatReader();
      reader.decodeFromVideoDevice(videoDevice.deviceId, "video", (result) => {
        if (result) {
          setResult(result.getText());
        }
      });
    }
  }, [videoDevice]);

  return (
    <>
      {result ? <p>Scanned code: {result}</p> : <p>Scanning</p>}
      <video id="video" width="600" height="400" />
    </>
  );
};

export default ScannerBot;
