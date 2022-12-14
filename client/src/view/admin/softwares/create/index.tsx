import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ToastContainer, toast } from "react-toastify";

interface Iareas {
  denominacao: string;
}

export function AdminSoftwareCadastrar() {
  const [nome, setNome] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [resumo, setResumo] = useState('');
  const [problema, setProblema] = useState('');
  const [vantagem, setVantagem] = useState('');
  const [aplicacao, setAplicacao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [colaborador, setColaborador] = useState('');
  const [data_criacao, setData_criacao] = useState('');
  const [links, setLinks] = useState('');
  const [criadores, setCriadores] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  const [area_cientifica, setArea_cientifica] = useState('');
  const [optionCientifica, setOptionCientifica] = useState<Iareas[]>([]);
  
  const [area_economica, setArea_economica] = useState('');
  const [optionEconomica, setOptionEconomica] = useState<Iareas[]>([]);

  const [palavra_chave, setPalavra_chave] = useState('');
  const [optionPalavraChave, setOptionPalavraChave] = useState<Iareas[]>([]);

  const handleImage = (e: { target: { files: any; }; }) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setImage(e.target.files[0]);
  };

  const handleVideo = (e: { target: { files: any; }; }) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const form = new FormData();
    form.append('nome', nome);
    form.append('sinopse', sinopse);
    form.append('resumo', resumo);
    form.append('problema', problema);
    form.append('vantagem', vantagem);
    form.append('aplicacao', aplicacao);
    form.append('telefone', telefone);
    form.append('email', email);
    form.append('colaborador', colaborador);
    form.append('data_criacao', data_criacao);
    form.append('links', links);
    form.append('criadores', criadores);
    form.append('area_cientifica', area_cientifica);
    form.append('area_economica', area_economica);
    form.append('palavra_chave', palavra_chave);
    form.append('image', image);
    form.append('video', video);
    
    try {
      await api.post('/softwares/cadastrar', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      toast.success('Software cadastrado com sucesso!');
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api.get('/areaCientifica').then(response => {
      setOptionCientifica(response.data);
      console.log(area_cientifica);
    })
  }, [])

  useEffect(() => {
    api.get('/palavraChave').then(response => {
      setOptionPalavraChave(response.data);
    })
  }, [])

  useEffect(() => {
    api.get('/areaEconomica').then(response => {
      setOptionEconomica(response.data);
    })
  }, [])

  return (
    <section className="grid p-10">
      <ToastContainer />
      <h1 className="text-[#374151]">Cadastro de Software</h1>
      <div className="bg-white rounded-md shadow-md w-full">
        <form className="grid grid-cols-2 p-5 text-[#374151] text-xl font-bold" onSubmit={handleSubmit}>
          <div>
            <p>Nome:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" cols={55} rows={5} name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <p>Sinopse:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" name="sinopse" id="sinopse" cols={55} rows={5} value={sinopse} onChange={(e) => setSinopse(e.target.value)} />
          </div>
          <div>
            <p>Resumo:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" name="resumo" id="resumo" cols={55} rows={5} value={resumo} onChange={(e) => setResumo(e.target.value)} />
          </div>
          <div>
            <p>Problema:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" name="problema" id="problema" cols={55} rows={5} value={problema} onChange={(e) => setProblema(e.target.value)} />
          </div>
          <div>
            <p>Aplica????o:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" name="aplicacao" id="aplicacao" cols={55} rows={5} value={aplicacao} onChange={(e) => setAplicacao(e.target.value)} />
          </div>
          <div>
            <p>Vantagem:</p>
            <textarea className="shadow-md bg-[#F8FAFC]" name="vantagem" id="vantagem" cols={55} rows={5} value={vantagem} onChange={(e) => setVantagem(e.target.value)} />
          </div>
          <div>
            <p>??rea Cient??fica:</p>
            <select name="area_cientifica" id="area_cientifica" onChange={(e) => setArea_cientifica(e.target.value)}>
              {optionCientifica.map((optionCientifica) => (
                <option value={optionCientifica.denominacao}>{optionCientifica.denominacao}</option>
              ))}
            </select>
          </div>
          <div>
            <p>??rea Econ??mica:</p>
            <select name="area_economica" id="area_economica" onChange={(e) => setArea_economica(e.target.value)}>
              {optionEconomica.map((optionEconomica) => (
                <option value={optionEconomica.denominacao}>{optionEconomica.denominacao}</option>
              ))}
            </select>
          </div>
          <div>
            <p>Palavra Chave:</p>
            <select name="palavraChave" id="palavraChave" onChange={(e) => setPalavra_chave(e.target.value)}>
              {optionPalavraChave.map((optionPalavraChave) => (
                <option value={optionPalavraChave.denominacao} >{optionPalavraChave.denominacao}</option>
              ))}
            </select>
          </div>
          <div>
            <p>Criadores:</p>
            <input type="text" name="criadores" id="criadores" value={criadores} onChange={(e) => setCriadores(e.target.value)} />
          </div>
          <div>
            <p>Colaborador:</p>
            <input type="text" name="colaborador" id="colaborador" value={colaborador} onChange={(e) => setColaborador(e.target.value)} />
          </div>
          <div>
            <p>Data de Cria????o:</p>
            <input type="date" name="data_criacao" id="data_criacao" value={data_criacao} onChange={(e) => setData_criacao(e.target.value)} />
          </div>
          <div>
            <p>Email:</p>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <p>Telefone:</p>
            <input type="number" name="telefone" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div>
            <p>Links:</p>
            <input type="text" name="links" id="links" value={links} onChange={(e) => setLinks(e.target.value)} />
          </div>
          <div>
            <p>Imagem:</p>
            <input type="file" name="image" id="image" onChange={handleImage} />
          </div>
          <div>
            <p>Video:</p>
            <input type="file" name="video" id="video" onChange={handleVideo} />
          </div>
          <div className="flex mt-8">
            <button className="w-fit h-fit" type="submit"> Cadastrar </button>
          </div>

        </form>
      </div>
    </section>
  )
}