# Aula 02 - Prova Final Javascript

### Links uteis
[Protótipo](https://xd.adobe.com/view/4bd3fba7-f671-4202-b5e2-17137367ef1d-1e80/screen/8497f9e8-5eff-4ae8-8380-b1874cd674c0/specs/)
[]()

O último teste do módulo de Javascript consiste em criar uma página seguindo este protótipo (somente a página de apostas)

Para concluir o teste, deve-se usar todo o conhecimento adquirido no curso Javascript Ninja.


## Requisitos Não Funcionais
**RNF01**. Construir toda a página utilizando Html, CSS e Javascript Puro.

**RNF02**. Consumir o arquivo JSON para obter os jogos e suas regras (em anexo aqui)

**RNF03**. Se preferir, pode utilizar Bootstrap

**RNF04**. Deve-se manter uma alta fidelidade ao protótipo, independente da preferência do estudante. Os ícones podem ser baixados clicando AQUI , ou vocês poderam utilizar ícones semelhantes da lib do bootstrap ou outras libs.

**RNF05**. A organização do código é indispensável nessa prova, será analisado também conceitos de código limpo

**RNF06**. A usabilidade do usuário e testes das funcionalidades codificadas são indispensáveis, pois no momento da correção, vamos analisar cada requisito aqui especificado! O uso da criatividade está liberado, caso notem que algo pode ficar melhor para a utilização do usuário final!


## Requisitos Funcionais
**RF01**. Complete Game: para completar aleatoriamente os números

**RF02**. Clear game: limpar todos os números selecionados

**RF03**. Add to cart: adicionar os números no carrinho (Poderá ser adicionado, várias apostas no carrinho, idependente se for do mesmo jogo ou não. Observação: jogos são diferentes de apostas.)

**RF04**. Delete: apagar um item do carrinho

**RF05**. Listagem de jogos dinâmica: De acordo com o que é excluído ou adicionado um novo objeto no array de games no arquivo JSON, esta ação deve interferir na renderização dos jogos para aposta.

**RF06**. Seleção de jogo obrigatória: O primeiro jogo do array sempre deve vir selecionado por padrão

**RF07**. Complete game: a função de complete game, pode completar um jogo em andamento e ao utilizar o complete game, o usuário deve conseguir mudar os números manualmente na cartela

**RF08**. Add to cart: Ao adicionar uma nova aposta no carrinho, os números da cartela devem ser limpos

**RF09**. Add to cart: O min_and_max_number é o número exato que um usuário deve selecionar para conseguir fazer uma aposta! Ou seja, não deve permitir o cadastro de cartelas cujo os números selecionados seja maior ou menor do que o especificado na chave min_and_max_number

**RF10**. Add to cart: Todos os valores monetários apresentados na tela, devem seguir a formatação da moeda brasileira
