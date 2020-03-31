import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function UpdateIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [id, setId] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleUpdateIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };

        try {
            await api.put(`/incidents/${id}`, data, {
                headers: {
                    Authorization: ongId,
                },
            });

            history.push('/profile');
        } catch {
            alert('Erro! Ao editar o caso tente novamente.')
        }

    }

    return (
        <div className="update-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Edite o caso</h1>
                    <p>Descreva novamente o caso detalhadamente para encontrar um herói para resolver isso.</p>
  
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link> 
                </section>
                <form onSubmit={handleUpdateIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}

                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <input 
                        placeholder="ID do caso"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Editar</button>
                </form>
            </div>
        </div>
    );
}