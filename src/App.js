import React, { useState } from 'react';
import './App.css';
import fotoPerfil from './perfil.jpg';

// ********PÁGINAS **********

function Inicio() {
  return (
    <div className="pagina">
      <h2>Datos Personales</h2>
      <img src={fotoPerfil} alt="Foto" className="foto" />
      <p><strong>Nombre:</strong> Alan Javier</p>
      <p><strong>Apellido:</strong> Garcia Rivas</p>
      <p><strong>Correo:</strong> (alanjaviergarcia72@gmail.com)</p>
    </div>
  );
}

function Sumadora() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(null);

  const sumar = () => {
    setResultado(parseFloat(num1) + parseFloat(num2));
  };

  return (
    <div className="pagina">
      <h2>Sumadora</h2>
      <input type="number" placeholder="Número 1" value={num1} onChange={e => setNum1(e.target.value)} />
      <input type="number" placeholder="Número 2" value={num2} onChange={e => setNum2(e.target.value)} />
      <button onClick={sumar}>Sumar</button>
      {resultado !== null && <p>Resultado: <strong>{resultado}</strong></p>}
    </div>
  );
}

function Traductor() {
  const [numero, setNumero] = useState('');
  const [letras, setLetras] = useState('');

  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

  const convertir = () => {
    const n = parseInt(numero);
    if (isNaN(n) || n < 1 || n > 1000) {
      setLetras('Ingresa un número entre 1 y 1000');
      return;
    }
    if (n === 1000) { setLetras('mil'); return; }
    if (n < 20) { setLetras(unidades[n]); return; }
    if (n < 30) {
      setLetras(n === 20 ? 'veinte' : 'veinti' + unidades[n - 20]);
      return;
    }
    if (n < 100) {
      setLetras(n % 10 === 0 ? decenas[Math.floor(n / 10)] : decenas[Math.floor(n / 10)] + ' y ' + unidades[n % 10]);
      return;
    }
    if (n === 100) { setLetras('cien'); return; }
    if (n < 200) { setLetras('ciento ' + convertirAux(n - 100)); return; }
    const centenas = ['', '', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
    const c = Math.floor(n / 100);
    const resto = n % 100;
    setLetras(resto === 0 ? centenas[c] : centenas[c] + ' ' + convertirAux(resto));
  };

  const convertirAux = (n) => {
    if (n < 20) return unidades[n];
    if (n < 30) return n === 20 ? 'veinte' : 'veinti' + unidades[n - 20];
    return n % 10 === 0 ? decenas[Math.floor(n / 10)] : decenas[Math.floor(n / 10)] + ' y ' + unidades[n % 10];
  };

  return (
    <div className="pagina">
      <h2>Traductor de Números a Letras</h2>
      <input type="number" placeholder="Número del 1 al 1000" value={numero} onChange={e => setNumero(e.target.value)} />
      <button onClick={convertir}>Convertir</button>
      {letras && <p>Resultado: <strong>{letras}</strong></p>}
    </div>
  );
}

function TablaMultiplicar() {
  const [numero, setNumero] = useState('');
  const [tabla, setTabla] = useState([]);

  const generar = () => {
    const n = parseInt(numero);
    if (isNaN(n)) return;
    const result = [];
    for (let i = 1; i <= 13; i++) {
      result.push(`${n} x ${i} = ${n * i}`);
    }
    setTabla(result);
  };

  return (
    <div className="pagina">
      <h2>Tabla de Multiplicar</h2>
      <input type="number" placeholder="Ingresa un número" value={numero} onChange={e => setNumero(e.target.value)} />
      <button onClick={generar}>Generar</button>
      <ul>
        {tabla.map((linea, i) => <li key={i}>{linea}</li>)}
      </ul>
    </div>
  );
}

function Experiencia() {
  return (
    <div className="pagina">
      <h2>Mi Experiencia</h2>
      <p>Aquí va el video explicando mi experiencia:</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/TU_ID_DE_VIDEO"
        title="Experiencia"
        allowFullScreen
      ></iframe>
    </div>
  );
}

// ****** MAIN ************

function App() {
  const [pagina, setPagina] = useState('inicio');

  const renderPagina = () => {
    switch (pagina) {
      case 'inicio': return <Inicio />;
      case 'sumadora': return <Sumadora />;
      case 'traductor': return <Traductor />;
      case 'tabla': return <TablaMultiplicar />;
      case 'experiencia': return <Experiencia />;
      default: return <Inicio />;
    }
  };

  return (
    <div className="app">
      <nav className="menu">
        <button onClick={() => setPagina('inicio')}> Inicio</button>
        <button onClick={() => setPagina('sumadora')}> Sumadora</button>
        <button onClick={() => setPagina('traductor')}> Traductor</button>
        <button onClick={() => setPagina('tabla')}>Tabla</button>
        <button onClick={() => setPagina('experiencia')}> Experiencia</button>
      </nav>
      <main>
        {renderPagina()}
      </main>
    </div>
  );
}

export default App;