import axios from "axios";
import { useEffect, useState } from "react";

export default function FormationsPart() {
  const [user, setUser] = useState([]);
  const [table, setTable] = useState();
  const [tableFormation, setTableFormation] = useState([]);
  const [reload,setReload] = useState(false)

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("login")));
    const fetchData = async () => {
      try {
        let res = await axios.get("http://localhost:9000/formations");
        setTable(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    setReload(!reload)
  }, []);

  useEffect(() => {
    if (table) {
      const formations = table.map((row) => (
        <tr key={row._id}>
          <td>{row.titre}</td>
          <td>{row.domaine}</td>
          <td>{row.niveau}</td>
          <td>{row.disponible}</td>
          <td>{user.formationsInscrites.includes(+row.id) ? <button onClick={()=>{handleQuiter(row.id)}}>quiter</button> : <button onClick={()=>{handleInscri(row.id)}}>inscri</button>}</td>
        </tr>
      ));
      setTableFormation(formations);
    }
  }, [table]);

  const handleQuiter = (id) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/utilisateurs/${user.id}`);
        console.log(response.data);
        response.data.formationsInscrites = response.data.formationsInscrites.filter(item => item !== id);
        console.log(response.data);
        await axios.put(`http://localhost:9000/utilisateurs/${user.id}`, response.data);

        setReload(!reload)



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
  function handleInscri(id) {
    alert(id)
  }

  return (
    <>
      <h1>Formations participants</h1>
      <table border={1} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Domaine</th>
            <th>Niveau</th>
            <th>Disponibilité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableFormation}</tbody>
      </table>
    </>
  );
}
