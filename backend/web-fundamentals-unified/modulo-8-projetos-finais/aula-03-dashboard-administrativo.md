# Aula 3: Dashboard Administrativo

## Objetivos da Aula
- Criar dashboard completo para administradores
- Implementar gerenciamento de produtos, usuários e pedidos
- Desenvolver sistema de relatórios e analytics
- Criar interface responsiva e intuitiva

## Estrutura do Dashboard

### 1. Layout Principal
```typescript
// src/components/admin/AdminLayout.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin' },
    { icon: '🛍️', label: 'Produtos', path: '/admin/products' },
    { icon: '👥', label: 'Usuários', path: '/admin/users' },
    { icon: '📦', label: 'Pedidos', path: '/admin/orders' },
    { icon: '📈', label: 'Relatórios', path: '/admin/reports' },
    { icon: '⚙️', label: 'Configurações', path: '/admin/settings' }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <a 
              key={item.path}
              href={item.path}
              className="nav-item"
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <img src={user?.avatar} alt="Avatar" />
            <span>{user?.name}</span>
          </div>
          <button onClick={logout} className="logout-btn">
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>Dashboard Administrativo</h1>
          </div>
          
          <div className="header-right">
            <div className="notifications">
              <button className="notification-btn">
                🔔
                <span className="notification-badge">3</span>
              </button>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};
```

### 2. Dashboard Principal
```typescript
// src/components/admin/Dashboard.tsx
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/recent-orders'),
        fetch('/api/admin/top-products')
      ]);

      setStats(await statsRes.json());
      setRecentOrders(await ordersRes.json());
      setTopProducts(await productsRes.json());
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Usuários</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h3>{stats.totalProducts}</h3>
            <p>Produtos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Pedidos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>R$ {stats.totalRevenue.toFixed(2)}</h3>
            <p>Receita</p>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="dashboard-content">
        <div className="dashboard-left">
          <div className="chart-container">
            <h3>Vendas por Mês</h3>
            <canvas id="salesChart"></canvas>
          </div>
        </div>
        
        <div className="dashboard-right">
          <div className="recent-orders">
            <h3>Pedidos Recentes</h3>
            <div className="orders-list">
              {recentOrders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-customer">{order.customer.name}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-total">R$ {order.total}</span>
                    <span className={`order-status status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## Gerenciamento de Produtos

### 1. Lista de Produtos
```typescript
// src/components/admin/ProductsList.tsx
import React, { useState, useEffect } from 'react';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/admin/products?${params}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      fetchProducts(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleToggleStatus = async (productId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus })
      });
      fetchProducts(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  return (
    <div className="products-list">
      <div className="products-header">
        <h2>Gerenciar Produtos</h2>
        <a href="/admin/products/new" className="btn btn-primary">
          Adicionar Produto
        </a>
      </div>

      {/* Filtros */}
      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Todas as categorias</option>
          <option value="electronics">Eletrônicos</option>
          <option value="clothing">Roupas</option>
          <option value="books">Livros</option>
        </select>
      </div>

      {/* Tabela de Produtos */}
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-thumbnail"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status ${product.active ? 'active' : 'inactive'}`}>
                      {product.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <a 
                        href={`/admin/products/${product.id}/edit`}
                        className="btn btn-sm btn-secondary"
                      >
                        Editar
                      </a>
                      <button
                        onClick={() => handleToggleStatus(product.id, product.active)}
                        className="btn btn-sm btn-warning"
                      >
                        {product.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
```

### 2. Formulário de Produto
```typescript
// src/components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';

const ProductForm: React.FC<{ productId?: string }> = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!productId);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      const product = await response.json();
      setFormData(product);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing 
        ? `/api/admin/products/${productId}`
        : '/api/admin/products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Redirecionar para lista de produtos
        window.location.href = '/admin/products';
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { url } = await response.json();
        setFormData(prev => ({ ...prev, image: url }));
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  return (
    <div className="product-form">
      <h2>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nome do Produto</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="electronics">Eletrônicos</option>
              <option value="clothing">Roupas</option>
              <option value="books">Livros</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Preço (R$)</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">Estoque</label>
            <input
              type="number"
              id="stock"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagem do Produto</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
            />
            Produto ativo
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
          </button>
          <a href="/admin/products" className="btn btn-secondary">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
};
```

## Gerenciamento de Usuários

### 1. Lista de Usuários
```typescript
// src/components/admin/UsersList.tsx
import React, { useState, useEffect } from 'react';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (roleFilter) params.append('role', roleFilter);
      
      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus })
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao alterar role:', error);
    }
  };

  return (
    <div className="users-list">
      <div className="users-header">
        <h2>Gerenciar Usuários</h2>
      </div>

      {/* Filtros */}
      <div className="users-filters">
        <input
          type="text"
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-select"
        >
          <option value="">Todos os roles</option>
          <option value="user">Usuário</option>
          <option value="moderator">Moderador</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Tabela de Usuários */}
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Último Login</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <img 
                      src={user.avatar || '/default-avatar.png'} 
                      alt={user.name}
                      className="user-avatar"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value)}
                      className="role-select"
                    >
                      <option value="user">Usuário</option>
                      <option value="moderator">Moderador</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td>
                    <span className={`status ${user.active ? 'active' : 'inactive'}`}>
                      {user.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    {user.lastLogin 
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : 'Nunca'
                    }
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => handleToggleUserStatus(user.id, user.active)}
                        className="btn btn-sm btn-warning"
                      >
                        {user.active ? 'Desativar' : 'Ativar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
```

## Sistema de Relatórios

### 1. Relatórios de Vendas
```typescript
// src/components/admin/Reports.tsx
import React, { useState, useEffect } from 'react';

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState({
    salesByMonth: [],
    topProducts: [],
    customerStats: {},
    revenueStats: {}
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      const params = new URLSearchParams({
        start: dateRange.start,
        end: dateRange.end
      });
      
      const response = await fetch(`/api/admin/reports?${params}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  };

  const exportReport = async (format: 'csv' | 'pdf') => {
    try {
      const params = new URLSearchParams({
        start: dateRange.start,
        end: dateRange.end,
        format
      });
      
      const response = await fetch(`/api/admin/reports/export?${params}`);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${dateRange.start}-${dateRange.end}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
    }
  };

  return (
    <div className="reports">
      <div className="reports-header">
        <h2>Relatórios</h2>
        
        <div className="date-range">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
          />
          <span>até</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
          />
        </div>
        
        <div className="export-buttons">
          <button 
            onClick={() => exportReport('csv')}
            className="btn btn-secondary"
          >
            Exportar CSV
          </button>
          <button 
            onClick={() => exportReport('pdf')}
            className="btn btn-secondary"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="report-stats">
        <div className="stat-card">
          <h3>Receita Total</h3>
          <p>R$ {reportData.revenueStats.total?.toFixed(2) || '0.00'}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pedidos</h3>
          <p>{reportData.revenueStats.orders || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Ticket Médio</h3>
          <p>R$ {reportData.revenueStats.averageTicket?.toFixed(2) || '0.00'}</p>
        </div>
        
        <div className="stat-card">
          <h3>Novos Clientes</h3>
          <p>{reportData.customerStats.newCustomers || 0}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="report-charts">
        <div className="chart-container">
          <h3>Vendas por Mês</h3>
          <canvas id="salesChart"></canvas>
        </div>
        
        <div className="chart-container">
          <h3>Produtos Mais Vendidos</h3>
          <div className="top-products">
            {reportData.topProducts.map((product, index) => (
              <div key={product.id} className="product-item">
                <span className="rank">#{index + 1}</span>
                <span className="name">{product.name}</span>
                <span className="sales">{product.sales} vendas</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

## API do Admin

### 1. Rotas de Administração
```javascript
// routes/admin.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');

// Middleware para verificar se é admin
router.use(authenticateToken);
router.use(requireRole(['admin', 'moderator']));

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    res.json({
      totalUsers: stats[0],
      totalProducts: stats[1],
      totalOrders: stats[2],
      totalRevenue: stats[3][0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Produtos
router.get('/products', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usuários
router.get('/users', async (req, res) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;
    
    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Relatórios
router.get('/reports', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const [salesByMonth, topProducts, customerStats, revenueStats] = await Promise.all([
      // Vendas por mês
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: 'paid'
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            total: { $sum: '$total' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      
      // Produtos mais vendidos
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: 'paid'
          }
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.id',
            name: { $first: '$items.name' },
            sales: { $sum: '$items.quantity' }
          }
        },
        { $sort: { sales: -1 } },
        { $limit: 10 }
      ]),
      
      // Estatísticas de clientes
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            newCustomers: { $sum: 1 }
          }
        }
      ]),
      
      // Estatísticas de receita
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: 'paid'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
            orders: { $sum: 1 },
            averageTicket: { $avg: '$total' }
          }
        }
      ])
    ]);
    
    res.json({
      salesByMonth,
      topProducts,
      customerStats: customerStats[0] || { newCustomers: 0 },
      revenueStats: revenueStats[0] || { total: 0, orders: 0, averageTicket: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Exercícios Práticos

### 1. Sistema de Notificações
- Notificações em tempo real
- Sistema de alertas
- Histórico de notificações

### 2. Auditoria e Logs
- Log de ações administrativas
- Histórico de alterações
- Sistema de backup

### 3. Configurações Avançadas
- Configurações do sistema
- Temas personalizáveis
- Integrações com APIs

## Próximos Passos

1. **Aula 4**: Integração com APIs de Pagamento
2. **Aula 5**: Sistema de Notificações
3. **Aula 6**: Analytics e Relatórios

## Recursos Adicionais

- [Chart.js](https://www.chartjs.org/)
- [React Admin](https://marmelab.com/react-admin/)
- [Ant Design](https://ant.design/)
- [Material-UI](https://mui.com/)

---

**Tempo estimado**: 5-6 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Aulas 1-2 do Módulo 8







