import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'scanner-container', // El ID del elemento HTML donde se mostrará el escáner
      {
        // Opciones de configuración del escáner
        fps: 10, // Cuadros por segundo
        qrbox: { width: 250, height: 250 }, // Tamaño de la caja del escáner
      },
      {
        // Opciones para el resultado del escaneo
        // Esta es una función de callback que se ejecuta cuando un código es escaneado exitosamente
        onScanSuccess: (decodeText) => {
          console.log(`Código escaneado: ${decodeText}`);
          alert(`Código escaneado: ${decodeText}`); // Muestra una alerta con el texto decodificado
        },
        // Opciones para el escaneo en caso de error
        onScanError: (errorMessage) => {
          console.error(`Error al escanear: ${errorMessage}`);
        },
      }
    );

    // Iniciar el escáner
    scanner.render();

    // Limpieza al desmontar el componente
    return () => {
      scanner.clear(); // Limpia el escáner y detiene el streaming de la cámara
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div id="scanner-container" ref={scannerRef} style={{ width: '100%', height: '400px' }}>
      {/* Este es el contenedor donde se renderizará el escáner */}
    </div>
  );
};

export default QrScanner;