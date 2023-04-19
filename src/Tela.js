import axios from "axios"
import { useState } from "react";
import Card from "./Card";

export default function Tela()
{
    const [pokemon, setPokemon] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [alertErro, setAlertErro] = useState(null);
    
    
    async function  carregaPokemon()
    {
        try{
            setPokemon(null)
            setAlertErro(0)
            const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/"+pesquisa.toLowerCase());
            setPokemon(data);
        } catch(erro){

            setAlertErro(true)
        }
    }

    function pokeNome(evento)
    {
        setPesquisa(evento.target.value)
    }
    return (
        <div>
            <div className="input-group  mb-3">
                <input type="text" onChange={pokeNome} className="form-control" placeholder="Digite o nome"  />
                <button disabled={ pesquisa == "" } onClick={carregaPokemon} className="btn btn-outline-secondary" type="button">
                    Pesquisar</button>
            </div>

            {(pokemon != null) ? <Card person={ pokemon } /> : ""}
            {(alertErro == true)? <div className="alert alert-danger" role="alert">
                            Não encontrado
                        </div> :  ""
            }
        </div>
    )
    
}