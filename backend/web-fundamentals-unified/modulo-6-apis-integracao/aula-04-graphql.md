# Aula 4: GraphQL

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender os conceitos fundamentais do GraphQL
- Criar schemas e tipos GraphQL
- Implementar resolvers para queries e mutations
- Configurar subscriptions para tempo real
- Integrar GraphQL com banco de dados
- Criar uma API GraphQL completa

## 📚 Conteúdo da Aula

### 1. Introdução ao GraphQL

#### O que é GraphQL?
GraphQL é uma linguagem de consulta e runtime para APIs que permite aos clientes solicitar exatamente os dados que precisam.

#### Vantagens do GraphQL
- **Flexibilidade**: Cliente solicita apenas os dados necessários
- **Tipagem forte**: Schema define a estrutura dos dados
- **Introspectivo**: API se documenta automaticamente
- **Evolutivo**: Adicionar campos sem quebrar clientes existentes
- **Tempo real**: Suporte nativo a subscriptions

#### Comparação REST vs GraphQL

```javascript
// REST - Múltiplas requisições
GET /api/users/1
GET /api/users/1/posts
GET /api/users/1/posts/1/comments

// GraphQL - Uma única requisição
query {
  user(id: 1) {
    name
    email
    posts {
      title
      content
      comments {
        text
        author {
          name
        }
      }
    }
  }
}
```

### 2. Schema e Tipos

#### Tipos Escalares

```javascript
// schema/types.js
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Representa um usuário do sistema',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'ID único do usuário'
        },
        name: {
            type: GraphQLString,
            description: 'Nome completo do usuário'
        },
        email: {
            type: GraphQLString,
            description: 'Email do usuário'
        },
        age: {
            type: GraphQLInt,
            description: 'Idade do usuário'
        },
        isActive: {
            type: GraphQLBoolean,
            description: 'Se o usuário está ativo'
        },
        score: {
            type: GraphQLFloat,
            description: 'Pontuação do usuário'
        }
    })
});

module.exports = { UserType };
```

#### Tipos Complexos

```javascript
// schema/types.js
const { GraphQLObjectType, GraphQLList, GraphQLNonNull } = require('graphql');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: {
            type: UserType,
            resolve: (post) => {
                // Resolver para buscar o autor do post
                return User.findById(post.authorId);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (post) => {
                return Comment.find({ postId: post.id });
            }
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLInt },
        text: { type: GraphQLString },
        author: {
            type: UserType,
            resolve: (comment) => {
                return User.findById(comment.authorId);
            }
        },
        post: {
            type: PostType,
            resolve: (comment) => {
                return Post.findById(comment.postId);
            }
        }
    })
});
```

#### Input Types

```javascript
// schema/inputs.js
const { GraphQLInputObjectType, GraphQLNonNull } = require('graphql');

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Nome do usuário'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Email do usuário'
        },
        age: {
            type: GraphQLInt,
            description: 'Idade do usuário'
        }
    })
});

const PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: () => ({
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Título do post'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Conteúdo do post'
        },
        authorId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'ID do autor'
        }
    })
});

module.exports = { UserInputType, PostInputType };
```

### 3. Queries

#### Definindo Queries

```javascript
// schema/queries.js
const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const { UserType, PostType } = require('./types');

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        // Buscar todos os usuários
        users: {
            type: new GraphQLList(UserType),
            description: 'Lista todos os usuários',
            args: {
                limit: { type: GraphQLInt, defaultValue: 10 },
                offset: { type: GraphQLInt, defaultValue: 0 }
            },
            resolve: async (parent, args) => {
                return User.find()
                    .limit(args.limit)
                    .skip(args.offset);
            }
        },
        
        // Buscar usuário por ID
        user: {
            type: UserType,
            description: 'Busca um usuário por ID',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                return User.findById(args.id);
            }
        },
        
        // Buscar usuário por email
        userByEmail: {
            type: UserType,
            description: 'Busca um usuário por email',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                return User.findOne({ email: args.email });
            }
        },
        
        // Buscar posts
        posts: {
            type: new GraphQLList(PostType),
            description: 'Lista todos os posts',
            args: {
                limit: { type: GraphQLInt, defaultValue: 10 },
                authorId: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const query = {};
                if (args.authorId) {
                    query.authorId = args.authorId;
                }
                
                return Post.find(query).limit(args.limit);
            }
        },
        
        // Buscar post por ID
        post: {
            type: PostType,
            description: 'Busca um post por ID',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                return Post.findById(args.id);
            }
        }
    })
});

module.exports = { QueryType };
```

### 4. Mutations

#### Definindo Mutations

```javascript
// schema/mutations.js
const { GraphQLObjectType, GraphQLNonNull } = require('graphql');
const { UserType, PostType } = require('./types');
const { UserInputType, PostInputType } = require('./inputs');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        // Criar usuário
        createUser: {
            type: UserType,
            description: 'Cria um novo usuário',
            args: {
                input: { type: new GraphQLNonNull(UserInputType) }
            },
            resolve: async (parent, args) => {
                const user = new User(args.input);
                return await user.save();
            }
        },
        
        // Atualizar usuário
        updateUser: {
            type: UserType,
            description: 'Atualiza um usuário existente',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                input: { type: new GraphQLNonNull(UserInputType) }
            },
            resolve: async (parent, args) => {
                const user = await User.findByIdAndUpdate(
                    args.id,
                    args.input,
                    { new: true }
                );
                return user;
            }
        },
        
        // Deletar usuário
        deleteUser: {
            type: GraphQLBoolean,
            description: 'Deleta um usuário',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const result = await User.findByIdAndDelete(args.id);
                return !!result;
            }
        },
        
        // Criar post
        createPost: {
            type: PostType,
            description: 'Cria um novo post',
            args: {
                input: { type: new GraphQLNonNull(PostInputType) }
            },
            resolve: async (parent, args) => {
                const post = new Post(args.input);
                return await post.save();
            }
        },
        
        // Atualizar post
        updatePost: {
            type: PostType,
            description: 'Atualiza um post existente',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                input: { type: new GraphQLNonNull(PostInputType) }
            },
            resolve: async (parent, args) => {
                const post = await Post.findByIdAndUpdate(
                    args.id,
                    args.input,
                    { new: true }
                );
                return post;
            }
        },
        
        // Deletar post
        deletePost: {
            type: GraphQLBoolean,
            description: 'Deleta um post',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const result = await Post.findByIdAndDelete(args.id);
                return !!result;
            }
        }
    })
});

module.exports = { MutationType };
```

### 5. Subscriptions

#### Configuração de Subscriptions

```javascript
// schema/subscriptions.js
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { UserType, PostType } = require('./types');

const pubsub = new PubSub();

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({
        // Subscription para novos usuários
        userCreated: {
            type: UserType,
            description: 'Notifica quando um novo usuário é criado',
            subscribe: () => pubsub.asyncIterator(['USER_CREATED'])
        },
        
        // Subscription para posts atualizados
        postUpdated: {
            type: PostType,
            description: 'Notifica quando um post é atualizado',
            args: {
                postId: { type: GraphQLInt }
            },
            subscribe: (parent, args) => {
                return pubsub.asyncIterator(`POST_UPDATED_${args.postId}`);
            }
        },
        
        // Subscription para comentários
        commentAdded: {
            type: GraphQLString,
            description: 'Notifica quando um comentário é adicionado',
            subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED'])
        }
    })
});

module.exports = { SubscriptionType, pubsub };
```

#### Integrando Subscriptions com Mutations

```javascript
// schema/mutations.js
const { pubsub } = require('./subscriptions');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: UserType,
            description: 'Cria um novo usuário',
            args: {
                input: { type: new GraphQLNonNull(UserInputType) }
            },
            resolve: async (parent, args) => {
                const user = new User(args.input);
                const savedUser = await user.save();
                
                // Publicar evento de usuário criado
                pubsub.publish('USER_CREATED', {
                    userCreated: savedUser
                });
                
                return savedUser;
            }
        },
        
        updatePost: {
            type: PostType,
            description: 'Atualiza um post existente',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                input: { type: new GraphQLNonNull(PostInputType) }
            },
            resolve: async (parent, args) => {
                const post = await Post.findByIdAndUpdate(
                    args.id,
                    args.input,
                    { new: true }
                );
                
                // Publicar evento de post atualizado
                pubsub.publish(`POST_UPDATED_${args.id}`, {
                    postUpdated: post
                });
                
                return post;
            }
        }
    })
});
```

### 6. Resolvers Avançados

#### Resolvers com Context

```javascript
// schema/resolvers.js
const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            // Context contém informações do usuário autenticado
            if (!context.user) {
                throw new Error('Usuário não autenticado');
            }
            
            return User.find().limit(args.limit);
        },
        
        user: async (parent, args, context) => {
            const user = await User.findById(args.id);
            
            // Verificar se o usuário pode acessar este perfil
            if (context.user.id !== user.id && context.user.role !== 'admin') {
                throw new Error('Acesso negado');
            }
            
            return user;
        }
    },
    
    Mutation: {
        createUser: async (parent, args, context) => {
            // Apenas admins podem criar usuários
            if (context.user.role !== 'admin') {
                throw new Error('Apenas administradores podem criar usuários');
            }
            
            const user = new User(args.input);
            return await user.save();
        }
    },
    
    User: {
        posts: async (parent, args, context) => {
            // Resolver para buscar posts do usuário
            return Post.find({ authorId: parent.id });
        },
        
        fullName: (parent) => {
            // Campo computado
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
};

module.exports = { resolvers };
```

#### DataLoader para N+1 Problem

```javascript
// utils/dataloader.js
const DataLoader = require('dataloader');

// Loader para usuários
const userLoader = new DataLoader(async (userIds) => {
    const users = await User.find({ _id: { $in: userIds } });
    return userIds.map(id => users.find(user => user.id === id));
});

// Loader para posts
const postLoader = new DataLoader(async (postIds) => {
    const posts = await Post.find({ _id: { $in: postIds } });
    return postIds.map(id => posts.find(post => post.id === id));
});

// Loader para posts por autor
const postsByAuthorLoader = new DataLoader(async (authorIds) => {
    const posts = await Post.find({ authorId: { $in: authorIds } });
    return authorIds.map(authorId => 
        posts.filter(post => post.authorId === authorId)
    );
});

module.exports = {
    userLoader,
    postLoader,
    postsByAuthorLoader
};
```

#### Resolvers com DataLoader

```javascript
// schema/resolvers.js
const { userLoader, postsByAuthorLoader } = require('../utils/dataloader');

const resolvers = {
    User: {
        posts: async (parent) => {
            return postsByAuthorLoader.load(parent.id);
        }
    },
    
    Post: {
        author: async (parent) => {
            return userLoader.load(parent.authorId);
        }
    }
};
```

### 7. Integração com Express

#### Configuração do Servidor

```javascript
// server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const schema = require('./schema');
const { resolvers } = require('./schema/resolvers');

const app = express();

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token inválido, mas não bloqueia a requisição
        }
    }
    
    next();
};

// GraphQL endpoint
app.use('/graphql', authenticateToken, graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'development',
    context: ({ req }) => ({
        user: req.user
    })
}));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

const server = createServer(app);

// Configurar WebSocket para subscriptions
SubscriptionServer.create(
    {
        schema,
        execute,
        subscribe,
        onConnect: (connectionParams) => {
            // Autenticação para WebSocket
            const token = connectionParams.authorization?.split(' ')[1];
            if (token) {
                try {
                    return { user: jwt.verify(token, process.env.JWT_SECRET) };
                } catch (error) {
                    throw new Error('Token inválido');
                }
            }
            return {};
        }
    },
    {
        server,
        path: '/subscriptions'
    }
);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Servidor GraphQL rodando na porta ${PORT}`);
    console.log(`GraphiQL disponível em http://localhost:${PORT}/graphql`);
});
```

### 8. Cliente GraphQL

#### Apollo Client

```javascript
// client/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client/link/core';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link para queries e mutations
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

// WebSocket link para subscriptions
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
        reconnect: true,
        connectionParams: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
});

// Auth link para adicionar token
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// Split link para usar WebSocket para subscriptions e HTTP para o resto
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;
```

#### Queries no Cliente

```javascript
// queries/users.js
import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers($limit: Int, $offset: Int) {
        users(limit: $limit, offset: $offset) {
            id
            name
            email
            posts {
                id
                title
            }
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: Int!) {
        user(id: $id) {
            id
            name
            email
            posts {
                id
                title
                content
                comments {
                    id
                    text
                    author {
                        name
                    }
                }
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            name
            email
        }
    }
`;

export const USER_CREATED_SUBSCRIPTION = gql`
    subscription UserCreated {
        userCreated {
            id
            name
            email
        }
    }
`;
```

#### Componente React com Apollo

```javascript
// components/UserList.js
import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_USERS, CREATE_USER, USER_CREATED_SUBSCRIPTION } from '../queries/users';

const UserList = () => {
    const { data, loading, error, refetch } = useQuery(GET_USERS, {
        variables: { limit: 10, offset: 0 }
    });
    
    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: () => {
            refetch();
        }
    });
    
    // Subscription para novos usuários
    useSubscription(USER_CREATED_SUBSCRIPTION, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log('Novo usuário criado:', subscriptionData.data.userCreated);
            refetch();
        }
    });
    
    const handleCreateUser = async () => {
        try {
            await createUser({
                variables: {
                    input: {
                        name: 'Novo Usuário',
                        email: 'novo@email.com',
                        age: 25
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };
    
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;
    
    return (
        <div>
            <h2>Lista de Usuários</h2>
            <button onClick={handleCreateUser}>
                Criar Novo Usuário
            </button>
            <ul>
                {data.users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email}
                        <ul>
                            {user.posts.map(post => (
                                <li key={post.id}>{post.title}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
```

### 9. Projeto Prático Completo

#### Estrutura do Projeto

```
graphql-project/
├── server.js
├── package.json
├── .env
├── schema/
│   ├── index.js
│   ├── types.js
│   ├── inputs.js
│   ├── queries.js
│   ├── mutations.js
│   ├── subscriptions.js
│   └── resolvers.js
├── models/
│   ├── User.js
│   └── Post.js
├── utils/
│   └── dataloader.js
├── middleware/
│   └── auth.js
└── client/
    ├── apollo.js
    ├── queries/
    │   └── users.js
    └── components/
        └── UserList.js
```

#### Schema Principal

```javascript
// schema/index.js
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

// Carregar schema do arquivo
const schemaString = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
);

const schema = buildSchema(schemaString);

module.exports = schema;
```

#### Schema GraphQL

```graphql
# schema/schema.graphql
type User {
    id: Int!
    name: String!
    email: String!
    age: Int
    isActive: Boolean!
    posts: [Post!]!
    createdAt: String!
}

type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    createdAt: String!
}

type Comment {
    id: Int!
    text: String!
    author: User!
    post: Post!
    createdAt: String!
}

input UserInput {
    name: String!
    email: String!
    age: Int
}

input PostInput {
    title: String!
    content: String!
    authorId: Int!
}

type Query {
    users(limit: Int, offset: Int): [User!]!
    user(id: Int!): User
    userByEmail(email: String!): User
    posts(limit: Int, authorId: Int): [Post!]!
    post(id: Int!): Post
}

type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: Int!, input: UserInput!): User!
    deleteUser(id: Int!): Boolean!
    createPost(input: PostInput!): Post!
    updatePost(id: Int!, input: PostInput!): Post!
    deletePost(id: Int!): Boolean!
}

type Subscription {
    userCreated: User!
    postUpdated(postId: Int!): Post!
    commentAdded: String!
}
```

## 🎯 Exercícios Práticos

### Exercício 1: Schema GraphQL
Crie um schema GraphQL para um sistema de e-commerce com:
- Produtos, categorias e pedidos
- Queries para buscar produtos
- Mutations para criar pedidos
- Subscriptions para atualizações de estoque

### Exercício 2: Resolvers Avançados
Implemente resolvers com:
- Autenticação e autorização
- DataLoader para otimização
- Validação de dados
- Tratamento de erros

### Exercício 3: Cliente Apollo
Crie um cliente React com Apollo:
- Queries e mutations
- Subscriptions em tempo real
- Cache management
- Error handling

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Conceitos fundamentais** do GraphQL
2. **Schema e tipos** GraphQL
3. **Queries, mutations e subscriptions**
4. **Resolvers avançados** com context e DataLoader
5. **Integração com Express** e WebSocket
6. **Cliente Apollo** para React
7. **Projeto prático completo** com GraphQL
8. **Boas práticas** de desenvolvimento

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **WebSockets**, incluindo:
- Conceitos de WebSockets
- Implementação com Socket.io
- Chat em tempo real
- Notificações push
- Integração com APIs

## 📚 Recursos Adicionais

- [GraphQL.org](https://graphql.org/) - Documentação oficial
- [Apollo GraphQL](https://www.apollographql.com/) - Plataforma GraphQL
- [GraphQL Playground](https://github.com/graphql/graphql-playground) - IDE para GraphQL
- [DataLoader](https://github.com/graphql/dataloader) - Biblioteca para resolver N+1
- [GraphQL Subscriptions](https://github.com/apollographql/graphql-subscriptions) - Subscriptions







