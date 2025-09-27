import React, { useState, useEffect } from 'react';
import './styles.css';

const 1.1TeoriaeFundamentos = () => {
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
        <div className="1.1-teoria-e-fundamentos">
            <h2>1.1 Teoria e Fundamentos</h2>
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

export default 1.1TeoriaeFundamentos;
