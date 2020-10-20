## Crypto Watch :moneybag:

## About
Um app simples e com o objetivo de ser intuitivo para cosultas rápidas de pares de Cryptomoedas. O objetivo principal é que as informações possam ser acessadas 'At a Glance'

## Features

- Coins pair rank
  - O ranque é baseado na variação cambial dos pares sendo o primeiro colocado o par que possui maior variação positiva.

- Filtros
 - É possível filtrar o ranking pelo par de moeda (texto) e por alguns outros filtros disponíveis no menu à esquerda

- Grafico de cotação (10 dias)
  - Ao acessar um par é possível interagir com o grafico da cotação dos ultimos 10 dias.

- Informações dos pares
  - Ao acessar um par é possível verificar o nome de cada moeda, a sua taxa de mineração e o seu tipo.

## Tecnologias aplicadas

- React
- Redux
  - Controle global de estados
- Redux Thunk
  - Controle de requisições assincronas
- Styled-Components
  - Components estilizados
- Jest
  - Para testes unitários
- Enzyme
  - para testes end-to-end

Bibliotecas adicionas
- react/prop-types
  - para prototipagem
- recharts
  - utilizado para gerar o gráfico


## Instalação
Após o clone do repositório

`cd crypto-watcher`

Instalar as dependências

`npm install`

Iniciar o aplicação (http://localhost:3000):

`npm start`

## Teste

Os testes utilizando Jest e Enzyme são executados automáticamente a cada Pull Request utilizando o Trevis CI
Para executar localmente execute:

`npm run test`

## Desafios econtrados
O maior desafio foi a implementação dos testes utilizando o enzyme.
Por estar usando components funcionais e hooks algumas funções do enzyme não retornavam o resultado esperado.
Outro ponto interessante para mensionar é a comunicação com a API por websockt. A função para realizar esta comunicação encontra-se pronta e funcional no serviço Poloniex (services/poloniex.js) mas não consegui aplicar ao rank dentro do prazo. A ideia é atualizar o preço atual ('pice') em tempo real.
