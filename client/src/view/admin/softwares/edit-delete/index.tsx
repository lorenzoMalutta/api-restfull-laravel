import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Link } from "react-router-dom";

export function AdminSoftwareEditDelete() {
  const deleteSoftware = async (id: number) => {
    await api.delete(`/softwares/${id}`);
  };

  interface ISoftware {
    nome: string;
    id: number;
    criadores: string;
    data_criacao: string;
    area_cientifica: string;
    area_economica: string;
    links: string;
    colaborador: string;
    palavra_chave: string;
  }

  const [software, setSoftware] = useState<ISoftware[]>([]);

  useEffect(() => {
    api.get('/softwares').then(response => {
      setSoftware(response.data);
    })
  }, [])
  return (
    <div className="p-10 h-screen">
      <h1>Editar e Deletar:</h1>
      <table className="shadow">
        <thead>
          <tr>
            <th>Título</th>
            <th>Colaborador</th>
            <th>Links</th>
            <th>Área Científica</th>
            <th>Área Econômica</th>
            <th>Palavra Chave</th>
            <th>Criador</th>
            <th>Data</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {software.map((software) => (
            <tr key={software.id}>
              <td>{software.nome}</td>
              <td>{software.colaborador}</td>
              <td>{software.links}</td>
              <td>{software.area_cientifica}</td>
              <td>{software.area_economica}</td>
              <td>{software.palavra_chave}</td>
              <td>{software.criadores}</td>
              <td>{software.data_criacao}</td>
              <td>
                <Link to={`/admin/softwares/edit/${software.id}`}>
                  <button className=" bg-[#2563EB] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm">Editar</button>
                </Link>
              </td>
              <td>
                <button className=" bg-[#2563EB] hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm" onClick={() => deleteSoftware(software.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}