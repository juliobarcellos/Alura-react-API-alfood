import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
    }, [])

    function excluir(restauranteParaExcluir: IRestaurante) {
        http.delete(`restaurantes/${restauranteParaExcluir.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id);
            setRestaurantes([...listaRestaurante])
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}