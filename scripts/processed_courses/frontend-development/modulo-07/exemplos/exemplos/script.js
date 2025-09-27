// JavaScript moderno com ES6+
class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    async postData(endpoint, data) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}

// Uso da classe
const dataManager = new DataManager('/api');

// Função assíncrona com async/await
const loadData = async () => {
    try {
        const data = await dataManager.fetchData('/items');
        console.log('Dados carregados:', data);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};

// Arrow functions e destructuring
const processItems = (items) => {
    return items.map(({ id, nome, ...rest }) => ({
        id,
        nome: nome.toUpperCase(),
        ...rest
    }));
};

export { DataManager, loadData, processItems };
