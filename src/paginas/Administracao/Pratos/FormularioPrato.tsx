import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioPrato() {

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    
    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
        .then(resposta => {
            setTags(resposta.data.tags)
        })
        http.get<IRestaurante[]>('restaurantes/')
        .then(resposta => {
            setRestaurantes(resposta.data)
        })
    }, [])

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault()
        const formData = new FormData();
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        if(imagem){
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => alert('Prato cadastrado com sucesso!'))
        .catch(erro => console.log(erro))

    }

    function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
        if(evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h1' variant='h6'>Formulário de Restaurantes</Typography>
            <Box component='form' onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    margin='dense'
                    fullWidth
                    required
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    margin='dense'
                    fullWidth
                    required
                />
                <FormControl margin='dense' fullWidth >
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => 
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth >
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => 
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
                <input type='file' onChange={selecionarArquivo} />
                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}