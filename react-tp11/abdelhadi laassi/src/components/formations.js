import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Formations() {
  const [formations, setFormations] = useState(null);
  const [formateurFormations, setFormateurFormations] = useState([]);
  const [formateur, setFormateur] = useState(null);
  const [utilisatuer, setUtilisateur] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("login");
    setFormateur(JSON.parse(data));

    fetch('http://localhost:9000/formations')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setFormations(json);
      });

  }, []);
  

  useEffect(() => {
    // Check for formateur and filter formateurFormations
    if (formateur && formations) {
      const formatForms = formations.filter(
        formation => formateur.formationsEnseignees.includes(formation.id)
      );
      setFormateurFormations(formatForms);
    }
  }, [formateur, formations]);

  function handleClick(id){
    navigate(`/formateur/formations/${id}`)
  }


  let tableFormation = formateurFormations.map((formation,index)=>{
    return (
        <tr key={index}>
            <td>{formation.titre}</td>
            <td>{formation.domaine}</td>
            <td>{formation.niveau}</td>
            <td>{formation.disponible}</td>
            <td><button  onClick={()=>{handleClick(formation.id)}}>afficher</button></td>
        </tr>
    )
  })
  return (
    <>
      <h1 style={{textAlign:"center"}} >formations</h1>
      <div>
            <table border={1} style={{width:"100%"}}>
                <tr>
                    <th>titre</th>
                    <th>domaine</th>
                    <th>niveau</th>
                    <th>disponiblité</th>
                    <th>actions</th>
                </tr>
                {tableFormation}

            </table>

      </div>
    </>
  );
}
