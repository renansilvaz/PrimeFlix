import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import { toast } from "react-toastify";

function Filme(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'e042fa176d69d1b358bbecfa5e2b19f3',
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data)
        setLoading(false)
      })
      .catch(()=>{
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme();

    return () =>{

    }

  }, [navigate, id])

  function salvarFilme(){
    const minhaLista= localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

    if(hasFilme){
      toast.warn("Filme já está salvo na lista")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo!")
  
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}alt="cover"/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filme;