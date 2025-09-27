import React, { useState, useEffect } from 'react';
import './styles.css';

const Componente = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="componente">
            <h2>Componente</h2>
            <div className="content">
                {data.map((item, index) => (
                    <div key={index} className="item">
                        {item.nome}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Componente;
