// pages/api/visitas.js
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo visitas.json
const filePath = path.resolve('visitas.json');

// Lê o conteúdo do arquivo ou cria um novo se não existir
function getData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { total: 0, ips: [] };
  }
}

// Salva o conteúdo no arquivo
function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const data = getData();

  if (!data.ips.includes(ip)) {
    data.total += 1;
    data.ips.push(ip);
    saveData(data);
  }

  res.status(200).json({ total: data.total });
}