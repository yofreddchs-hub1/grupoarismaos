import QrScanner from '../qr-scanner'; // Ajusta la ruta según tu estructura de archivos

const HomePage = () => {
  return (
    <div>
      <h1>Mi Escáner de Código QR</h1>
      <QrScanner />
    </div>
  );
};

export default HomePage;