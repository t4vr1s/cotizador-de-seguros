import React, { useState } from 'react';
import styled from '@emotion/styled';
import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Formulario = ({ setResumen, setCargando }) => {
  const initialState = {
    marca: '',
    year: '',
    plan: '',
  };

  const [datos, setDatos] = useState(initialState);
  const [error, setError] = useState(false);

  const { marca, year, plan } = datos;

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
      return setError(true);
    }

    setError(false);

    let resultado = 2000;

    const diferencia = obtenerDiferenciaYear(year);

    resultado -= (diferencia * 3 * resultado) / 100;

    resultado *= calcularMarca(marca);

    const incrementoPlan = obtenerPlan(plan);

    resultado *= incrementoPlan;

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResumen({
        cotizacion: Math.round(resultado),
        datos,
      });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={handleInputChange}>
          <option value="">-- Seleccione -- </option>
          <option value="americano"> Americano </option>
          <option value="europeo"> Europeo </option>
          <option value="asiatico"> Asiatico </option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={handleInputChange}>
          <option value="">-- Seleccione --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan</Label>
        <InputRadio
          check={plan === 'basico'}
          type="radio"
          name="plan"
          value="basico"
          onChange={handleInputChange}
        />
        Básico
        <InputRadio
          check={plan === 'completo'}
          type="radio"
          name="plan"
          value="completo"
          onChange={handleInputChange}
        />
        Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};
