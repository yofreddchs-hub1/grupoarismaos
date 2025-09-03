import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

function QRScanner(props) {
  const scannerRef = useRef(null);

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    if (props.open)
        setTimeout(handleClickAdvanced, 300);
    
    return ()=>{
        handleStop();
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      if ( props.onResult) props.onResult(decodedText);
      
      activarSonido();
      handleStop();
    };
    html5QrCode.start(
      { facingMode: "environment" },
      props.type === "QR" ? qrConfig : brConfig,
      qrCodeSuccessCallback
    );
  };
  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const activarSonido = () => {
    var audio = document.getElementById('audioScaner');
    audio.play();
  }

  return (
    <div style={{ position: "relative" }}>
      <div id="reader" width="100%" />
      {!props.open
        ?   <button onClick={() => handleClickAdvanced()}>
                click pro {props.type ? props.type : "Camara"}
            </button>
        :   null
      }
      
      {!props.open
        ?   <button onClick={() => handleStop()}>stop pro</button>
        :   null
      }
      <audio id="audioScaner" src="/sonidos/sonido.mp3"></audio>
    </div>
  );
}

export default QRScanner;