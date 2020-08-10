import React, { useState } from "react";

export function Teste() {
  const [cepValue, setCepValue] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");

  function cepCapturado(e) {
    setCepValue(e.target.value);
  }
  async function buscaCep() {
    try {
      const cep = require("awesome-cep");
      await cep.findCEP(cepValue).then((resp) => {
        setCepValue(resp.cep);
        setRua(resp.address_name);
        setEstado(resp.state);
        setCidade(resp.city);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div style={{ marginTop: "300px" }}>
        <input label="CPF" value={cepValue} onChange={cepCapturado}></input>
        <button type="submit" onClick={buscaCep}>
          Pesquisar
        </button>
        <p>{`Endereço: ${rua}`}</p>
        <br />
        <p>{`Estado: ${estado}`}</p>
        <br />
        <p>{`Cidade: ${cidade}`}</p>
      </div>
    </>
  );
}
