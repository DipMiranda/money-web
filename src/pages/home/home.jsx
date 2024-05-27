import Sidebar from "../../components/sidebar/sidebar.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import "./home.css";
import icon from "../../styles/icon.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const Home = () => {
   /* let dados = [
        {id:1, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-carro.png", categoria:"Carro", descricao:"Pagamento IPVA", valor: 2500},
        {id:2, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-casa.png", categoria:"Casa", descricao:"Condomínio", valor: 620},
        {id:3, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-Lazer.png", categoria:"Lazer", descricao:"Sorvete do parque", valor: 17.50},
        {id:4, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria:"Mercado", descricao:"Compras Walmart", valor: 375},
        {id:5, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-treinamento.png", categoria:"Educação", descricao:"Faculdade", valor: 490},
        {id:6, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria:"Viagem", descricao:"Passagem Aérea", valor: 610},
        {id:7, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria:"Mercado", descricao:"Churrasco", valor: 140},
        {id:8, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria:"Viagem", descricao:"Hotel", valor: 330},
];*/


const navigate = useNavigate();
const [despesas, setDespesas] = useState([]);
const [total, setTotal] = useState(0);


const ListarDespesa = async (busca) => {
    try{
        //acesar api
        const response = await api.get ("/despesas", {
            params:{
                filtro:busca
            }
        })

        setDespesas(response.data);

        let soma = 0;
            for (var i=0; i < response.data.length; i++){
                soma = soma + Number (response.data[i].valor);
        }

        setTotal(soma);

    } catch (error) {
        alert("Erro ao buscar dados");
       console.log(error);
        }
}

    const OpenDespesa = (id) => {
        navigate("despesa/" + id);
       
    }
    const DeleteDespesa =  (id) => {
        try {
        confirmAlert({
            title:"Exclusão",
            message: <p> Confirma a exclusão da despesa id: {id} ?   </p>,
            buttons:[{
                label:"Sim",
                onClick: async () =>{
                    await api.delete("/despesas/" +id);
                    ListarDespesa();

                }
            },
            {
                label:"Não",
                onClick: () =>{}
            }]
        });

           
        } catch (error) {
            
        }
    }

    useEffect(() =>{
        ListarDespesa();
    },[]);


    

    return <>
    <Sidebar/>
    <Navbar onClickSearch ={ListarDespesa} total = {total} search ={true} />

    <div className="containeir-home">
        <div className="title-home">
            <h1> Despesas </h1>
            <button onClick = {() => navigate ("/despesa/add")}className=" btn btn-green">Adicionar despesa</button>
        </div>

        <div className="box-despesa">
            <table>
                <thead>
                    <tr>
                        <th>id.Despesa</th>
                        <th>Descrição </th>
                        <th>Categoria</th>
                        <th className="text-right">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        despesas.map ((desp) => {       
                            return<tr>
                        <td>{desp.id}</td>
                        <td>{desp.descricao}</td>
                        <td>
                            <div>                        
                                <img className="icon-sm" src={desp.categoriaDetalhe.icon}/>
                                <span className="ml-10">{desp.categoria}</span>       
                            </div>
                        </td>

                        <td className="text-right">
                            R$ {Number(desp.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})}
                        </td>
                        <td className="text-right">
                                <button onClick={() => OpenDespesa (desp.id)} className="btn btn-blue"> 
                                <img className="icon-sm" src={icon.edit}/>
                                </button>
                                <button onClick={() => DeleteDespesa(desp.id)} className="btn btn-red ml-10"> 
                                <img className="icon-sm" src={icon.remove}/>
                                </button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>

                {/*tratamento de erros  se não encontrado despesas */}
            {
                despesas.length == 0 && <div className="empty-despesa" > 
                    <img src= {icon.empty} className="img"/>
                    <p> Nenhuma depesa encontrada </p>
                </div>
            }
        </div>
    </div>

    </>


}

export default Home;