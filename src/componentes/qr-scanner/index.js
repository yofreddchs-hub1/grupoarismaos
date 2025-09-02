import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {qrcode} from './qrCode.min.js';
const QrScanner = (props) => {
  const scannerRef = useRef(null);
  const [video,setVideo]= useState(null);
  const [canvasElement,setCanvasElement]= useState(null);
  const [canvas,setCanvas]= useState(null);
  const [btnScanQR,setbtnScanQR]= useState(null);

  let scanning= false;

  //funcion para encender la camara
  const encenderCamara = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        scanning = true;
        btnScanQR.hidden = true;
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
      });
  };
  
  //funciones para levantar las funiones de encendido de la camara
  function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
  }

  function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  }

  //apagara la camara
  const cerrarCamara = () => {
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  };

  useEffect(() => {
    const vid = document.createElement("video");
    setVideo(vid);
    //nuestro camvas
    const canvasElement = document.getElementById("qr-canvas");
    const canvas = canvasElement.getContext("2d");

    setCanvasElement(canvasElement);
    setCanvas(canvas);

    //div donde llegara nuestro canvas
    const btnScanQR = document.getElementById("btn-scan-qr");
    setbtnScanQR(btnScanQR);
    
    // const scanner = new Html5QrcodeScanner(
    //   'scanner-container', // El ID del elemento HTML donde se mostrará el escáner
    //   {
    //     // Opciones de configuración del escáner
    //     fps: 10, // Cuadros por segundo
    //     qrbox: { width: 250, height: 250 }, // Tamaño de la caja del escáner
        
    //   },
    //   {
    //     // Opciones para el resultado del escaneo
    //     // Esta es una función de callback que se ejecuta cuando un código es escaneado exitosamente
    //     onScanSuccess: (decodeText) => {
    //       console.log(`Código escaneado: ${decodeText}`);
          
    //     },
    //     // Opciones para el escaneo en caso de error
    //     onScanError: (errorMessage) => {
    //       console.error(`Error al escanear: ${errorMessage}`);
    //     },
    //   }
    // );

    // // Iniciar el escáner
    // scanner.render();

    // // Limpieza al desmontar el componente
    // return () => {
    //   scanner.clear(); // Limpia el escáner y detiene el streaming de la cámara
    // };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  useEffect(() => {

  },[props]);
  qrcode.callback = (respuesta) => {
      if (respuesta) {
        //console.log(respuesta);
        Swal.fire(respuesta)
        activarSonido();
        //encenderCamara();    
        cerrarCamara();    

      }
    };
  // <div id="scanner-container" ref={scannerRef} style={{ width: '100%', height: '400px' }}>
      {/* Este es el contenedor donde se renderizará el escáner */}
    // </div>
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-sm-4 shadow p-3">
        <h5 className="text-center">Escanear codigo QR</h5>
        <div className="row text-center">
          <a id="btn-scan-qr" href="#">
            <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg" className="img-fluid text-center" width="175"></img>
          </a>
          <canvas hidden="" id="qr-canvas" className="img-fluid"></canvas>
        </div>
        <div className="row mx-5 my-3">
          <button className="btn btn-success btn-sm rounded-3 mb-2" onClick={encenderCamara} >Encender camara</button>
          <button className="btn btn-danger btn-sm rounded-3" onClick={cerrarCamara}>Detener camara</button>
        </div>
      </div>
    </div>

  );
};

export default QrScanner;