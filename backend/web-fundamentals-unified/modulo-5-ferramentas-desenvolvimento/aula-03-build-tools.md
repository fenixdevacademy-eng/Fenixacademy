# 🔨 Aula 3: Build Tools e Bundling
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar Webpack e configuração
- ✅ Implementar Babel e transpilação
- ✅ Configurar CSS preprocessors
- ✅ Otimizar build e performance
- ✅ Implementar source maps
- ✅ Configurar hot reload
- ✅ Aplicar code splitting
- ✅ Implementar tree shaking

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do Webpack

#### **O que é Webpack?**
```javascript
// Webpack é um bundler de módulos para aplicações JavaScript
// Combina múltiplos arquivos em bundles otimizados
// Suporta loaders para diferentes tipos de arquivo
// Oferece plugins para funcionalidades avançadas

// Instalação
npm install --save-dev webpack webpack-cli

// Configuração básica - webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  devtool: 'source-map'
};
```

#### **Configuração Avançada**
```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

### 2. 🔄 Babel e Transpilação

#### **Configuração do Babel**
```bash
# Instalação
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/plugin-proposal-class-properties
npm install --save-dev @babel/plugin-transform-runtime
```

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not dead"]
        },
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
```

#### **Transpilação Avançada**
```javascript
// Exemplo de código ES6+ que será transpilado
class UserService {
  #apiKey = 'secret-key';
  
  async fetchUser(id) {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.#apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  *getUserIds() {
    for (let i = 1; i <= 10; i++) {
      yield i;
    }
  }
}

// Código transpilado (simplificado)
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);
  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

class UserService {
  constructor() {
    _apiKey.set(this, 'secret-key');
  }
  
  async fetchUser(id) {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${_classPrivateFieldGet(this, _apiKey)}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  *getUserIds() {
    for (let i = 1; i <= 10; i++) {
      yield i;
    }
  }
}
```

### 3. 🎨 CSS Preprocessors

#### **Sass/SCSS Configuration**
```bash
# Instalação
npm install --save-dev sass sass-loader
```

```javascript
// webpack.config.js - Loader para Sass
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['src/styles']
              }
            }
          }
        ]
      }
    ]
  }
};
```

#### **Exemplo de SCSS**
```scss
// styles/main.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 8px;
$box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

@mixin button-style($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: darken($bg-color, 10%);
    box-shadow: $box-shadow;
  }
}

.button {
  @include button-style($primary-color);
  
  &--secondary {
    @include button-style($secondary-color);
  }
  
  &--large {
    padding: 15px 30px;
    font-size: 1.2em;
  }
}

// Nesting
.card {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 20px;
  
  &__header {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  
  &__content {
    line-height: 1.6;
  }
  
  &--featured {
    border: 2px solid $primary-color;
  }
}
```

### 4. ⚡ Otimização de Build

#### **Code Splitting**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

// Lazy loading dinâmico
// src/components/LazyComponent.js
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Lazy loading com webpack
const loadModule = () => import('./module').then(module => module.default);
```

#### **Tree Shaking**
```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false
  }
};

// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}

// Exemplo de tree shaking
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from './utils.js';
// Apenas 'add' será incluído no bundle final
```

### 5. 🗺️ Source Maps

#### **Configuração de Source Maps**
```javascript
// webpack.config.js
module.exports = {
  devtool: 'source-map', // Para desenvolvimento
  // devtool: 'eval-source-map', // Mais rápido para desenvolvimento
  // devtool: 'cheap-module-source-map', // Para produção
  // devtool: false, // Sem source maps (menor bundle)
  
  // Configuração específica por ambiente
  devtool: process.env.NODE_ENV === 'production' 
    ? 'source-map' 
    : 'eval-source-map'
};
```

#### **Tipos de Source Maps**
```javascript
// Tipos de source maps e suas características:

// 1. source-map
// - Gera arquivo .map separado
// - Mais lento para build
// - Melhor para produção

// 2. eval-source-map
// - Inline no bundle
// - Mais rápido para desenvolvimento
// - Não recomendado para produção

// 3. cheap-module-source-map
// - Sem mapeamento de colunas
// - Mais rápido
// - Bom para produção

// 4. inline-source-map
// - Inline no bundle
// - Útil para desenvolvimento
// - Bundle maior
```

### 6. 🔥 Hot Reload e Dev Server

#### **Webpack Dev Server**
```bash
# Instalação
npm install --save-dev webpack-dev-server
```

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
};

// package.json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

#### **Hot Module Replacement (HMR)**
```javascript
// src/index.js
import './styles.css';
import { render } from './app.js';

// HMR para CSS
if (module.hot) {
  module.hot.accept('./styles.css', () => {
    console.log('CSS atualizado');
  });
}

// HMR para JavaScript
if (module.hot) {
  module.hot.accept('./app.js', () => {
    const newRender = require('./app.js').render;
    newRender();
  });
}

// React Hot Reload
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### 7. 🔧 Loaders e Plugins

#### **Loaders Comuns**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      // JavaScript/TypeScript
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      
      // Sass
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      
      // Imagens
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      
      // Fontes
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  }
};
```

#### **Plugins Essenciais**
```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    // Limpar diretório de build
    new CleanWebpackPlugin(),
    
    // Gerar HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    
    // Extrair CSS
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  }
};
```

### 8. 🚀 Build para Produção

#### **Configuração de Produção**
```javascript
// webpack.prod.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

#### **Scripts de Build**
```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "build:dev": "webpack --config webpack.dev.js",
    "build:analyze": "webpack-bundle-analyzer dist/main.js",
    "build:stats": "webpack --config webpack.prod.js --json > stats.json"
  }
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Configuração Básica do Webpack**
Configure Webpack do zero:
- Instalar dependências
- Configurar webpack.config.js
- Configurar loaders básicos
- Implementar build básico
- Testar funcionamento

**Critérios de avaliação:**
- ✅ Webpack configurado
- ✅ Loaders funcionais
- ✅ Build executado
- ✅ Bundle gerado

### **Exercício 2: Babel e Transpilação**
Configure Babel completo:
- Instalar Babel
- Configurar presets
- Configurar plugins
- Transpilar código ES6+
- Integrar com Webpack

**Critérios de avaliação:**
- ✅ Babel configurado
- ✅ Presets funcionais
- ✅ Plugins configurados
- ✅ Transpilação funcionando

### **Exercício 3: CSS Preprocessors**
Implemente Sass/SCSS:
- Instalar Sass
- Configurar loader
- Criar estilos SCSS
- Implementar mixins
- Otimizar build

**Critérios de avaliação:**
- ✅ Sass configurado
- ✅ Loader funcionando
- ✅ Estilos SCSS criados
- ✅ Mixins implementados

### **Exercício 4: Otimização Completa**
Otimize build para produção:
- Implementar code splitting
- Configurar tree shaking
- Otimizar assets
- Configurar source maps
- Implementar cache busting

**Critérios de avaliação:**
- ✅ Code splitting implementado
- ✅ Tree shaking configurado
- ✅ Assets otimizados
- ✅ Source maps funcionando

---

## 💡 Dicas Importantes

### **1. Webpack**
- Use mode apropriado (development/production)
- Configure devtool corretamente
- Otimize para seu caso de uso
- Monitore tamanho do bundle

### **2. Babel**
- Configure targets adequadamente
- Use presets apropriados
- Adicione plugins quando necessário
- Mantenha configuração atualizada

### **3. CSS**
- Use preprocessors para organização
- Implemente autoprefixer
- Otimize para produção
- Use CSS modules quando apropriado

### **4. Performance**
- Implemente code splitting
- Use tree shaking
- Otimize assets
- Configure cache adequadamente

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Testes Automatizados
- Jest para JavaScript
- Testes unitários e integração
- Mocks e stubs

---

## 📝 Checklist de Conclusão

- [ ] Dominou Webpack e configuração
- [ ] Implementou Babel e transpilação
- [ ] Configurou CSS preprocessors
- [ ] Otimizou build e performance
- [ ] Implementou source maps
- [ ] Configurou hot reload
- [ ] Aplicou code splitting
- [ ] Implementou tree shaking
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 3 com sucesso!**

---

## 📚 Recursos Adicionais

- [Webpack Documentation](https://webpack.js.org/)
- [Babel Documentation](https://babeljs.io/docs/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)

---

*Próxima aula: Testes Automatizados*
