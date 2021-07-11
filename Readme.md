# Two players, you and Bob, are going to play against each other

- You take the first two cards, Bob takes the next two
- Calculate the total sum of each players cards
- Numbered cards have the value on the card
  `Jack (J), Queen (Q) and King (K) each counts as 10 points Ace (A) counts as 11 points`

- If either player has 21 points - blackjack - that player wins the round
- Otherwise continue drawing cards following the following rules:
- You draw cards first until the sum of your cards is 17 or higher

- if you exceed 21 points you loose without Bob having to draw more cards
- Bob draws cards until the sum of his cards is higher than yours
- if his cards exceed 21 points he looses

## Endpoints

1. POST /games **Create a new game**

2. GET games/{id} **Get game status + details**

3. GET games/{id}/move **Make a new move + get results**

4. GET games/{id}/play **Play game till winner is found**

## Usage

### Run locally

```properties
yarn && yarn start
```

_Or_

```properties
npm install
npm start
```

### Run tests

```properties
yarn && yarn test
```

_Or_

```properties
npm install
npm run test
```
