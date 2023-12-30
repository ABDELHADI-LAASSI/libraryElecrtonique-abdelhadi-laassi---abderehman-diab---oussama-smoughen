import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function Formation(){

    const [formation , setFormation] = useState()
    const [participants , setParticipants] = useState()
    const [users,setUsers] = useState()
    const formId = useParams()
    const [tableUsers,setTableUsers] = useState()
    console.log(formId.id);


    useEffect(()=>{
        if(participants) {
            console.log(participants);
            const etudiants = participants.filter((row)=>{
                console.log("row participant",row.formationsInscrites)
                return true
            })
            console.log("etudiants",etudiants)
            setUsers(etudiants)
            let us = etudiants.map((user)=>{
                return (
                    <tr key={user.id}>
                        <td>{user.nom}</td>
                        <td>{user.email}</td>
                        <td>{user.formationsInscrites.includes(+formId.id) ? <button onClick={()=>{handleDelete(user.id)}}>delete</button> : <button onClick={()=>{handleAjout(user.id)}}>ajouter</button>}</td>
                    </tr>
                )
            })
            setTableUsers(us)
        }
    },[participants,formation])


const [reload,setReload] = useState(false)



    useEffect(()=>{

        fetch(`http://localhost:9000/formations/${formId.id}`)
        .then(response => response.json())
        .then(json => {
        setFormation(json)
        });

        fetch(`http://localhost:9000/utilisateurs?role=Participant`)
        .then(response => response.json())
        .then(json => {
            setParticipants(json)
        });

        
    },[reload])
    
    const handleDelete = (id) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/utilisateurs/${id}`);
                console.log("1",response.data);
                response.data.formationsInscrites = response.data.formationsInscrites.filter(item => item !== +formId.id);
                console.log("2",response.data);

                await axios.put(`http://localhost:9000/utilisateurs/${id}`, response.data);

                setReload(!reload)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }
    
    
    const handleAjout = (id) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/utilisateurs/${id}`);
                console.log("1",response.data);
                response.data.formationsInscrites.push(+formId.id);
                console.log("2",response.data);

                await axios.put(`http://localhost:9000/utilisateurs/${id}`, response.data);

                setReload(!reload)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }
    

    return(
        <>
            <h1>es participants</h1>
            <table border={1} style={{width:"100%"}}>
                <tr>
                    <th>nom</th>
                    <th>email</th>
                    <th>actions</th>
                </tr>
                {tableUsers}

            </table>
        </>
    )
}
