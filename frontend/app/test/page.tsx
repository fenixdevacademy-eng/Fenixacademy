"use client";

import React from 'react';
import '../test-styles.css';

export default function TestPage() {
  return (
    <div className="test-page">
      <div className="test-container">
        <h1 className="test-title">
          Teste de Estilos CSS
        </h1>
        <p className="test-description">
          Esta é uma página de teste para verificar se os estilos CSS estão funcionando corretamente.
        </p>
        <div className="test-grid">
          <div className="test-card test-card-blue">
            <h2 className="test-card-title">Card Azul</h2>
            <p className="test-card-text">Este é um card com fundo azul usando CSS customizado.</p>
          </div>
          <div className="test-card test-card-green">
            <h2 className="test-card-title">Card Verde</h2>
            <p className="test-card-text">Este é um card com fundo verde usando CSS customizado.</p>
          </div>
          <div className="test-card test-card-purple">
            <h2 className="test-card-title">Card Roxo</h2>
            <p className="test-card-text">Este é um card com fundo roxo usando CSS customizado.</p>
          </div>
        </div>
        <button className="test-button">
          Botão de Teste com CSS Customizado
        </button>
      </div>
    </div>
  );
}
