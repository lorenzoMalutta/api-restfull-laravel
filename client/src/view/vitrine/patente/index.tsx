import { useEffect, useState } from "react";
import { Cards } from "../../../components/cards";
import { Filter } from "../../../components/filter";
import api from "../../../services/api";

interface Iareas {
  denominacao: string;
}
interface IHome {
  nome: string;
  sinopse: string;
  palavra_chave: any[];
  id: number;
  tipo: string;
  area_cientifica: string;
  area_economica: string;
  image: string;
}

export function Patente() {
  const [patente, setPatente] = useState<IHome[]>([]);
  const [optionPalavraChave, setOptionPalavraChave] = useState<Iareas[]>([]);

  useEffect(() => {
    api.get('/palavraChave').then(response => {
      setOptionPalavraChave(response.data);
    })
  }, [])
  useEffect(() => {
    api.get('/patentes').then(response => {
      setPatente(response.data);
    })
  }, [])

  return (
    <section >
      <div className="mx-auto text-center">
        <div className="ml-10 mt-10 ">
          <h1 className="font-normal">Vitrine de Patentes</h1>
        </div>
        <div className="mx-auto text-center h-1 w-full bg-blue-700 lg:w-1/3"></div>
      </div>
      <div className="flex">
        <div className="m-10">
          <Filter
            filter="Vitrine de Patentes"
            setFilter={() => { }}
            type="patentes"
          />
        </div>
        <div className="grid justify-center pb-20 pt-10">
          <div className="grid grid-cols-3 max-w-fit gap-5">
            {patente.map((patente) => (
              <Cards
                type="patentes"
                image={patente.image}
                nome={patente.nome}
                sinopse={patente.sinopse}
                palavraChave={patente.palavra_chave}
                id={patente.id}
                areaCientifica={patente.area_cientifica}
                areaEconomica={patente.area_economica}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}