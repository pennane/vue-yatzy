import Vue from 'vue';
import store from '@/store'

const defaulAmoutOfPlayers = 2;

// Returns a array containing numbers that have been locked down
const findLockedDice = (dice, selectedDice) => {
    let lockedDice = []
    for (let i = 0; i < 5; i++) {
        if (selectedDice[i]) lockedDice.push(dice[i]);
    }
    return lockedDice
}

// Converts array of numbers into an array that has amount of values mapped to it from 1 to 6
// for example [1,3,3,6,5] => [1,0,2,0,1,1]
const diceToSumArray = (dice) => {
    let mapped = Array(6).fill(0);
    dice.forEach(die => mapped[die - 1]++)
    return mapped;
}

// Converts array of numbers into object that has amount of values mapped to it from 1 to 6
// for example [1,3,3,6,5] => {1:1,2:0,3:1,6:1,5:1}
const diceToSumObject = (dice) => {
    let mapped = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    dice.forEach(die => mapped[die]++)
    return mapped;
}

// Returns true if any die in the array has a value of x
const anyDieIsValue = (dice, seekedValue) => dice.some(val => val === seekedValue)

// Returns true if every die in the array has same value
const everyDieIsSame = (dice) => dice.every((val, i, arr) => val === arr[0]);

// Returns true if every die in the array is the same value as x
const everyDieIsValue = (dice, seekedValue) => dice.every((val) => val === seekedValue);

// Returns integer for how many of the dice are the value of x
const amountOfValue = (dice, seekedValue) => dice.reduce((acc, val) => val === seekedValue ? acc + 1 : acc)


// Categories for the game
const categories = [
    {
        name: "Ykköset",
        description: "1-silmälukuja",
        id: 0,
        upper: true,
        best: 5,
        test: (dice) => anyDieIsValue(dice, 1),
        points: (dice) => dice.filter(val => val === 1).reduce((acc, val) => acc + val)
    },
    {
        name: "Kakkoset",
        description: "2-silmälukuja",
        id: 1,
        upper: true,
        best: 10,
        test: (dice) => anyDieIsValue(dice, 2),
        points: (dice) => dice.filter(val => val === 2).reduce((acc, val) => acc + val)
    },
    {
        name: "Kolmoset",
        description: "3-silmälukuja",
        id: 2,
        upper: true,
        best: 15,
        test: (dice) => anyDieIsValue(dice, 3),
        points: (dice) => dice.filter(val => val === 3).reduce((acc, val) => acc + val)
    },
    {
        name: "Neloset",
        description: "4-silmälukuja",
        id: 3,
        upper: true,
        best: 20,
        test: (dice) => anyDieIsValue(dice, 4),
        points: (dice) => dice.filter(val => val === 4).reduce((acc, val) => acc + val)
    },
    {
        name: "Vitoset",
        description: "5-silmälukuja",
        id: 4,
        upper: true,
        best: 25,
        test: (dice) => anyDieIsValue(dice, 5),
        points: (dice) => dice.filter(val => val === 5).reduce((acc, val) => acc + val)
    },
    {
        name: "Kutoset",
        description: "6-silmälukuja",
        id: 5,
        upper: true,
        best: 30,
        test: (dice) => anyDieIsValue(dice, 6),
        points: (dice) => dice.filter(val => val === 6).reduce((acc, val) => acc + val)
    },
    {
        name: "Yksi pari",
        description: "Kaksi kappaletta samaa silmälukua",
        id: 6,
        best: 12,
        test: (dice) => diceToSumArray(dice).some(val => val >= 2),
        points: (dice) => {
            let diceSumObject = diceToSumObject(dice);
            let highestWithTwo = 0;
            for (let i = 0; i < 6; i++) {
                if (diceSumObject[i + 1] >= 2) {
                    highestWithTwo = i + 1;
                }
            }
            return highestWithTwo * 2
        }
    },
    {
        name: "Kaksi paria",
        description: "Kaksi eri paria",
        id: 7,
        best: 22,
        test: (dice) => diceToSumArray(dice).filter(val => val >= 2).length >= 2,
        points: (dice) => {
            let diceSumObject = diceToSumObject(dice);
            let pairs = [];
            for (let i = 0; i < 6; i++) {
                if (diceSumObject[i + 1] >= 2) {
                    pairs.push(i + 1)
                }
            }
            return pairs.reduce((acc, val) => acc + val * 2, 0)
        }
    },
    {
        name: "Kolmoisluku",
        description: "Kolme kappaletta samaa silmälukua",
        id: 8,
        best: 18,
        test: (dice) => diceToSumArray(dice).some(val => val >= 3),
        points: (dice) => {
            let diceSumObject = diceToSumObject(dice);
            let highestWithThree = 0;
            for (let i = 0; i < 6; i++) {
                if (diceSumObject[i + 1] >= 3) {
                    highestWithThree = i + 1;
                }
            }
            return highestWithThree * 3
        }
    },
    {
        name: "Neloisluku",
        description: "Neljä kappaletta samaa silmälukua",
        id: 9,
        best: 24,
        test: (dice) => diceToSumArray(dice).some(val => val >= 4),
        points: (dice) => {
            let diceSumObject = diceToSumObject(dice);
            let highestWithFour = 0;
            for (let i = 0; i < 6; i++) {
                if (diceSumObject[i + 1] >= 4) {
                    highestWithFour = i + 1;
                }
            }
            return highestWithFour * 4
        }
    },
    {
        name: "Pieni suora",
        description: "Viidessä nopassa silmäluvut 1+2+3+4+5",
        id: 10,
        best: 15,
        test: (dice) => {
            if (dice.includes(1) && dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5)) {
                return true;
            }
        },
        points: (dice) => {
            return 15;
        }
    },
    {
        name: "Suuri suora",
        description: "Viidessä nopassa silmäluvut 2+3+4+5+6",
        id: 11,
        best: 20,
        test: (dice) => {
            if (dice.includes(6) && dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5)) {
                return true;
            }
        },
        points: (dice) => {
            return 20;
        }
    },
    {
        name: "Mökki",
        description: "Yksi pari ja kolmoisluku",
        id: 12,
        best: 28,
        test: (dice) => diceToSumArray(dice).some(val => val === 3) && diceToSumArray(dice).some(val => val === 2),
        points: (dice) => {
            let diceSumObject = diceToSumObject(dice);
            let highestWithThree = 0;
            let highestWithTwo = 0;
            for (let i = 0; i < 6; i++) {
                if (diceSumObject[i + 1] === 3) {
                    highestWithThree = i + 1;
                }
                if (diceSumObject[i + 1] === 2) {
                    highestWithTwo = i + 1;
                }
            }

            return highestWithThree * 3 + highestWithTwo * 2
        }
    },
    {
        name: "Sattuma",
        description: "Kaikkien silmälukujen summa",
        id: 13,
        best: 30,
        test: (dice) => dice.length > 0,
        points: (dice) => dice.reduce((acc, val) => acc + val, 0)
    },
    {
        name: "Yatzy",
        description: "Viisi kappaletta samaa silmälukua",
        id: 14,
        best: 50,
        test: (dice) => diceToSumArray(dice).some(val => val >= 5),
        points: (dice) => {
            return 50;
        }
    }
];

const findMatchedCategories = (dice) => {

    let matched = categories.filter(category => category.test(dice));
    let points = matched.map(category => category.points(dice));
    return {
        categories: matched.map(category => category.id),
        points: points
    }
}

const rollDice = () => {

    let playerId = store.getters.currentPlayer;

    if (playerId === undefined) throw new Error("No player id to roll on");

    let moves = store.getters.moves;

    if (moves <= 0) {
        return;
    }


    if (store.getters.displayDice) {
        store.commit('setSelectedDice', {
            selectedDice: [false, false, false, false, false]
        })
        store.commit('displayDice', {
            state: false
        })
    }

    let currentDice = store.getters.getDice;
    let lockedDice = store.getters.selectedDice

    let dice = [];

    for (let i = 0; i < 5; i++) {
        dice.push(Math.floor(Math.random() * 6) + 1);
    }


    dice = dice.map((die, i) => lockedDice[i] ? currentDice[i] : die)




    store.commit('setDice', {
        playerId,
        dice
    })

    let movesLeft = moves - 1

    if (movesLeft <= 0) {
        store.commit('setMoves', {
            moves: 0
        })
        store.commit('setSelectedDice', {
            selectedDice: [true, true, true, true, true]
        })
        updateMatchedCategories()
    } else {
        store.commit('setMoves', {
            moves: movesLeft
        })
    }


};

const nextTurn = () => {
    calculateLowScores()
    calculateBonuses()
    calculateTotalScores()

    let gameCompleted = isGameCompleted();

    if (gameCompleted) {
        return store.commit('gameCompleted', true)
    }

    let newPlayer = store.getters.currentPlayer + 1
    let amountOfPlayers = store.getters.amountOfPlayers;

    if (newPlayer >= amountOfPlayers) {
        newPlayer = 0
    }

    store.commit('nextTurn', {
        player: newPlayer,
        displayDice: true,
        selectedDice: [null, null, null, null, null],
        moves: 3,
        matched: { categories: [], points: [] }
    })
}

const redeemPoints = (id) => {
    if (store.getters.displayDice) return;
    if (store.getters.currentlyRolling) return;
    let moves = store.getters.moves;
    if (moves === 3) return;

    let score = store.getters.getScore(id)
    let currentPlayer = store.getters.currentPlayer

    if (score && score[currentPlayer] !== undefined) {
        return
    }

    let playerDice = store.getters.getDice
    //let selectedDiceArray = store.getters.selectedDice;
    //let lockedDice = findLockedDice(playerDice, selectedDiceArray)

    let category = categories[id]

    let points = 0;
    /*if (category.test(lockedDice)) {
        points = category.points(lockedDice)
    }*/

    if (category.test(playerDice)) {
        points = category.points(playerDice)
    }

    store.commit('updateScoreForPlayer', {
        id: id,
        score: points,
        player: currentPlayer
    })
    /*
        store.commit('rolling', {
            rolling: true
        })
    */
    nextTurn()
}

const updateMatchedCategories = () => {
    if (store.getters.displayDice) return;
    let playerDice = store.getters.getDice
    //let selectedDiceArray = store.getters.selectedDice;
    //let lockedDice = findLockedDice(playerDice, selectedDiceArray)
    //let matchedCategories = findMatchedCategories(lockedDice)
    let matchedCategories = findMatchedCategories(playerDice)
    store.commit('setMatching', {
        matching: matchedCategories
    })
}

store.subscribe((mutation, state) => {
    if (mutation.type === "setDice") {
        updateMatchedCategories()
    }
})

const calculateLowScores = () => {
    let scores = store.getters.getScores;
    let amountOfPlayers = store.getters.amountOfPlayers;

    let calculated = []
    for (let i = 0; i < amountOfPlayers; i++) {
        let totalScore = 0;
        for (let j = 0; j < 6; j++) {
            if (scores[j] && scores[j][i]) {
                totalScore += scores[j][i];
            }
        }
        calculated[i] = totalScore;
    }

    store.commit('setTotalLowScores', {
        scores: calculated
    })
}

const calculateTotalScores = () => {
    let scores = store.getters.getScores;
    let amountOfPlayers = store.getters.amountOfPlayers;
    let bonusScores = store.getters.getBonusScores;

    let calculated = []
    for (let i = 0; i < amountOfPlayers; i++) {
        let totalScore = 0;
        for (let j = 0; j < categories.length; j++) {
            if (scores[j] && scores[j][i]) {
                totalScore += scores[j][i];
            }
        }
        if (bonusScores[i]) {
            totalScore += bonusScores[i]
        }
        calculated[i] = totalScore;
    }

    store.commit('setTotalScores', {
        scores: calculated
    })
}

const calculateBonuses = () => {
    let lowScores = store.getters.getTotalLowScores;
    let amountOfPlayers = store.getters.amountOfPlayers;

    let bonusScores = [];

    for (let i = 0; i < amountOfPlayers; i++) {
        if (lowScores[i] >= 63) {
            bonusScores[i] = 50
        }
    }

    store.commit('setBonusScores', {
        scores: bonusScores
    })
}

const isGameCompleted = () => {
    let scores = store.getters.getScores;
    let amountOfPlayers = store.getters.amountOfPlayers;
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < amountOfPlayers; j++) {
            if (!scores[i]) return false;
            if (scores[i][j] === undefined) return false;
        }
    }
    return true;
}

const startNewGame = (options = {}) => {
    let amountOfPlayers = options.players || defaulAmoutOfPlayers

    let players = [];
    let selectedDice = [false, false, false, false, false];
    let dice = [6, 6, 6, 6, 6]
    let displayDice = true;

    // Luo tyhjät pelaaja oliot 
    for (let i = 0; i < amountOfPlayers; i++) {
        players[i] = {
            points: 0
        }
    }

    // Valitsee satunnaisen pelaajan aloittamaan pelin
    let startingPlayer = Math.floor(Math.random() * amountOfPlayers)

    players[startingPlayer].turn = true;

    let storeableCategories = []

    categories.forEach(category => {
        let storeableCategory = {
            name: category.name,
            description: category.description,
            id: category.id,
            upper: category.upper,
            best: category.best
        };

        storeableCategories.push(storeableCategory)
    })
    store.commit("newGame", {
        categories: storeableCategories,
        players,
        startingPlayer,
        amountOfPlayers,
        dice,
        selectedDice,
        moves: 3,
        displayDice,
        gameCompleted: false,
        scores: []
    })
}

startNewGame({
    players: defaulAmoutOfPlayers
})

export default {
    findMatchedCategories,
    rollDice,
    redeemPoints,
    startNewGame
}