import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";

export default function FormularioRestaurante() {

    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://192.168.100.105:8000/api/v2/restaurantes/${parametros.id}`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        if (parametros.id) {
            axios.put(`http://192.168.100.105:8000/api/v2/restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
        } else {
            axios.post('http://192.168.100.105:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
        }
    }

    return (
        <form onSubmit={evento => { }}>
            <TextField
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="standard-basic"
                label="Nome do Restaurante"
                variant="standard"
            />
            <Button type='submit' variant="outlined">
                Salvar
            </Button>
        </form>
    )
}