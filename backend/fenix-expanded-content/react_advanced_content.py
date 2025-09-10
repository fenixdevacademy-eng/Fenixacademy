#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Conteúdo real para React Advanced - Fenix Team
"""

def get_react_advanced_real_content():
    """Conteúdo real e específico para React Advanced"""
    return """
## ⚛️ REACT AVANÇADO

### 🚀 Introdução ao React Moderno

React evoluiu significativamente desde sua criação em 2013. A versão moderna (React 18+) traz recursos poderosos como Hooks, Suspense, Concurrent Features e muito mais.

**Evolução do React:**
- **React 16.8+**: Hooks (2019)
- **React 17**: Event Delegation (2020)
- **React 18**: Concurrent Features (2022)
- **React 19**: Compiler (2024+)

**Princípios Fundamentais:**
- **Componentes**: Unidades reutilizáveis de UI
- **Estado**: Dados que mudam ao longo do tempo
- **Props**: Dados passados entre componentes
- **Virtual DOM**: Otimização de renderização
- **Unidirecional**: Fluxo de dados previsível

### 🎣 Hooks Avançados

**useState com Lazy Initialization:**
```jsx
import React, { useState } from 'react';

function ExpensiveComponent() {
  // Estado inicial calculado apenas uma vez
  const [count, setCount] = useState(() => {
    // Cálculo complexo executado apenas na primeira renderização
    return expensiveCalculation();
  });

  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return Math.floor(result);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**useEffect com Cleanup:**
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        
        // Verificar se o componente ainda está montado
        if (isMounted) {
          setData(userData);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}
```

**useReducer para Estado Complexo:**
```jsx
import React, { useReducer } from 'react';

const initialState = {
  count: 0,
  history: [],
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count]
      };
    
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count]
      };
    
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: []
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    
    default:
      return state;
  }
}

function CounterWithHistory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          +
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          -
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Reset
        </button>
      </div>
      
      <h3>History:</h3>
      <ul>
        {state.history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 🔄 Context API e Hooks Personalizados

**Context para Tema:**
```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#007bff');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  const value = {
    theme,
    accentColor,
    toggleTheme,
    changeAccentColor,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook personalizado para localStorage
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
```

**Hook para Fetch de Dados:**
```jsx
import { useState, useEffect, useCallback } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Uso do hook
function UserProfile({ userId }) {
  const { data: user, loading, error, refetch } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### ⚡ Performance e Otimização

**React.memo para Componentes:**
```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  // Simular processamento pesado
  const processedData = data.map(item => ({
    ...item,
    processed: item.value * 2 + Math.random()
  }));

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>
          {item.name}: {item.processed.toFixed(2)}
        </div>
      ))}
      <button onClick={onUpdate}>Update</button>
    </div>
  );
});

// Componente pai
function ParentComponent() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleUpdate = useCallback(() => {
    setData(prev => [...prev, { id: Date.now(), value: Math.random() }]);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      
      <ExpensiveComponent data={data} onUpdate={handleUpdate} />
    </div>
  );
}
```

**useMemo para Cálculos Custosos:**
```jsx
import React, { useState, useMemo } from 'react';

function DataProcessor({ items }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Cálculo custoso memoizado
  const processedItems = useMemo(() => {
    console.log('Processing items...');
    
    let result = items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'value') {
        return a.value - b.value;
      }
      return 0;
    });

    return result;
  }, [items, filter, sortBy]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="value">Sort by Value</option>
        </select>
      </div>

      <ul>
        {processedItems.map(item => (
          <li key={item.id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**useCallback para Funções:**
```jsx
import React, { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Função memoizada para adicionar todo
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);

  // Função memoizada para remover todo
  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Função memoizada para toggle todo
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🎨 Styled Components e CSS-in-JS

**Styled Components Avançados:**
```jsx
import styled, { css, keyframes, ThemeProvider } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Props condicionais
const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && css`
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      color: white;
    }
  `}
  
  ${props => props.size === 'large' && css`
    padding: 16px 32px;
    font-size: 18px;
  `}
  
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
`;

// Componente com animação
const AnimatedCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
  
  ${props => props.slide && css`
    animation: ${slideIn} 0.5s ease-out;
  `}
`;

// Tema personalizado
const theme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    large: '1200px'
  }
};

// Uso dos componentes
function StyledComponentsDemo() {
  return (
    <ThemeProvider theme={theme}>
      <AnimatedCard slide>
        <h2>Styled Components Demo</h2>
        <p>Este é um exemplo de styled components com tema personalizado.</p>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <Button variant="primary" size="large">
            Primary Button
          </Button>
          <Button variant="secondary">
            Secondary Button
          </Button>
          <Button disabled>
            Disabled Button
          </Button>
        </div>
      </AnimatedCard>
    </ThemeProvider>
  );
}
```

### 🔄 React Query e Gerenciamento de Estado

**React Query para Cache e Sincronização:**
```jsx
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});

function UserList() {
  const queryClient = useQueryClient();
  
  // Query para buscar usuários
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    }
  });

  // Mutation para criar usuário
  const createUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return response.json();
    },
    onSuccess: (newUser) => {
      // Atualizar cache otimisticamente
      queryClient.setQueryData(['users'], (oldUsers) => [...oldUsers, newUser]);
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    }
  });

  // Mutation para deletar usuário
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      return response.json();
    },
    onSuccess: (_, userId) => {
      // Atualizar cache otimisticamente
      queryClient.setQueryData(['users'], (oldUsers) => 
        oldUsers.filter(user => user.id !== userId)
      );
    }
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      
      <button
        onClick={() => createUserMutation.mutate({
          name: 'New User',
          email: 'newuser@example.com'
        })}
        disabled={createUserMutation.isLoading}
      >
        {createUserMutation.isLoading ? 'Creating...' : 'Add User'}
      </button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button
              onClick={() => deleteUserMutation.mutate(user.id)}
              disabled={deleteUserMutation.isLoading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Provider principal
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 🎯 Padrões Avançados

**Render Props Pattern:**
```jsx
import React from 'react';

function MouseTracker({ render }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return render(position);
}

// Uso
function App() {
  return (
    <div>
      <h1>Mouse Tracker</h1>
      <MouseTracker
        render={({ x, y }) => (
          <div>
            Mouse position: ({x}, {y})
          </div>
        )}
      />
    </div>
  );
}
```

**Higher-Order Components (HOC):**
```jsx
import React from 'react';

// HOC para adicionar funcionalidade de loading
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await props.fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data</div>;

    return <WrappedComponent {...props} data={data} />;
  };
}

// Componente que será envolvido
function UserProfile({ data }) {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}

// Aplicar HOC
const UserProfileWithLoading = withLoading(UserProfile);

// Uso
function App() {
  const fetchUser = async () => {
    const response = await fetch('/api/user/1');
    return response.json();
  };

  return (
    <UserProfileWithLoading fetchFunction={fetchUser} />
  );
}
```

### 🚀 React 18 Features

**Concurrent Features:**
```jsx
import React, { Suspense, startTransition, useTransition } from 'react';

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = React.useState([]);

  const handleSearch = (newQuery) => {
    // Marcar como transição não urgente
    startTransition(() => {
      setResults([]); // Limpar resultados imediatamente
      
      // Buscar novos resultados (pode ser lento)
      fetchSearchResults(newQuery).then(setResults);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Suspense para loading
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults query="" />
    </Suspense>
  );
}
```

### 📱 React Native e Mobile

**Componentes Nativos:**
```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

function AnimatedButton({ title, onPress }) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale: scaleValue }]
          }
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default AnimatedButton;
```

### 🎉 Conclusão

React Avançado oferece ferramentas poderosas para criar aplicações robustas e performáticas. Os principais pontos são:

1. **Hooks**: Gerenciamento de estado e efeitos colaterais
2. **Performance**: Otimizações com memo, useMemo e useCallback
3. **Padrões**: Render props, HOCs e custom hooks
4. **Estilização**: CSS-in-JS com styled-components
5. **Estado**: Gerenciamento com Context, Redux ou React Query
6. **Recursos Modernos**: Suspense, Concurrent Features e React 18

Lembre-se: React é uma biblioteca em constante evolução. Mantenha-se atualizado com as novas features e melhores práticas para aproveitar ao máximo o ecossistema.
"""

if __name__ == "__main__":
    content = get_react_advanced_real_content()
    print("Conteúdo React Advanced gerado com sucesso!")
    print(f"Total de linhas: {len(content.split(chr(10)))}")






