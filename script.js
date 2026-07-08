async function runGame() {
    let currentId = 'start';

    while (currentId) {
        const currentNode = storyData[currentId];
        document.getElementById('story-text').innerText = currentNode.text;

        const choices = currentNode.choices || (currentNode.nextId ? [{ text: 'Continue', nextId: currentNode.nextId }] : []);

        const choicesContainer = document.getElementById('choice-container');
        choices.forEach((choice) => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.className = 'choice-button';
            button.setAttribute('data-next-id', choice.nextId);
            choicesContainer.appendChild(button);
        });

        if (choices.length === 0) {
            await wait(3500);
            break;
        }

        currentId = await waitForChoice();
    }

    returnToStartScreen();
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('story-text').hidden = false;
    document.getElementById('choice-container').hidden = false;
    runGame();
}

function returnToStartScreen() {
    document.getElementById('story-text').hidden = true;
    document.getElementById('choice-container').hidden = true;
    document.getElementById('start-screen').style.display = '';
    document.getElementById('start-button').addEventListener('click', startGame, { once: true });
}

document.getElementById('start-button').addEventListener('click', startGame, { once: true });

function waitForChoice() {
    return new Promise((resolve) => {
        const buttons = document.querySelectorAll('.choice-button');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                document.getElementById('choice-container').innerHTML = '';
                resolve(e.target.dataset.nextId);
            },{once: true});
        });
    });
}

const storyData = {
    start: {
        text: "You're an Evee in a forest alone. You've lost your family and need to find them. You see two paths ahead. One path leads to a dark cave, and the other leads to a sunny meadow.",
        choices: [
            {
                text: 'take the path to the dark cave',
                nextId: 'darkCave'
            },
            {
                text: 'take the path to the sunny meadow',
                nextId: 'sunnyMeadow'
            }
        ]
    },
    darkCave: {
        text: "You enter the dark cave. It's cold and damp. You hear strange noises echoing through the cave.",
        choices: [
            {
                text: 'explore the cave', nextId: 'exploreCave'
            },
            {
                text: 'leave the cave', nextId: 'leaveCave'
            }
        ]
    },
    sunnyMeadow: {
        text: 'You walk into the sunlight of the meadow. As you bask in the warmth and beauty, You notice a group of friendly Pidgies playing nearby. They invite you to join them.',
        choices: [
            { text: 'join the Pidgies', nextId: 'joinPidgies'},
            { text: 'ignore the Pidgies and continue walking', nextId: 'continueMeadow'}
        ] 
    },
    exploreCave: {
        text: 'You venture deeper into the cave and find a hidden treasure chest filled with rare items. You feel a sense of accomplishment and decide to take the treasure with you.', nextId: 'treasureFound'
    },
    leaveCave: {
        text: 'You decide to leave the cave and continue on to find your family. As you exit the cave, you notice a beautiful waterfall nearby. You take a moment to enjoy the scenery before continuing your journey.', nextId: 'waterfall'},
    treasureFound: {
        text: 'With the treasure safely in tow, you press onward through the forest. Soon you come to a fork in the road: on the left is a dark path, and on the right is a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    waterfall: {
        text: 'After enjoying the waterfall, you continue on and soon come to a fork in the road: on the left is a dark path, and on the right is a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    joinPidgies: {
            text: 'You decide to join the Pidgies and have a great time playing with them. Before long, the sadness of being away from your family returns. You could ask them for help or simply leave',
            choices: [
                { text: 'ask the Pidgies for help', nextId: 'askPidgies'},
                { text: 'Leave the Pidgies and continue your journey', nextId: 'continueMeadow'}
            ]
        },
    askPidgies: {
        text: 'The Pidgies are happy to help. They lead you to a hidden path that takes you closer to your family. Feeling grateful, you thank them and continue your journey. Soon, you arrive at a fork in the road. on the left is a dark path and on the right is a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    continueMeadow: {
        text: 'You continue walking through the meadow, enjoying the warmth of the sun. As you walk, you notice a small village in the distance. You also notice a small hidden path near the trees. Which way will you go?',
        choices: [
            { text: 'Head towards the village', nextId: 'village' },
            { text: 'Take the hidden path', nextId: 'hiddenPath' }
        ]
    },
    darkPath: {
        text: 'You take the dark path and find yourself in a dense forest. The trees are tall and make you feel uneasy. Suddenly, you hear a rustling in the bushes and a Team Rocket member suddenly appears! What do you do?',
        choices: [
            { text: 'fight the Team Rocket member', nextId: 'fightRocket' },
            { text: 'run away', nextId: 'runAway' }
        ]
    },
    narrowPath: {
        text: 'You take the narrow path and find yourself in a beautiful garden filled with colorful flowers. There are Bulbasaurs and Oddish playing in the garden. You can either join in on the fun or continue on',
        choices: [
            { text: 'join the Bulbasaurs and the Oddish', nextId: 'joinGarden' },
            { text: 'continue on', nextId: 'continueGarden' }
        ]
    },
    fightRocket: {
        text: 'You bravely fight the Team Rocket member and manage to defeat them. You feel a small rush of power and confidence. You continue on your journey feeling more confident',
        nextId: 'continueForest'
    },
    runAway: {
        text: 'You run away from the Team Rocket member and find yourself in a small clearing. You take a moment to catch your breath and gather your thoughts before continuing on',
        nextId: 'continueForest'
    },
    continueForest: {
        text: 'You press on through the forest and spot smoke rising from chimneys in the distance, a village. Hopeful, you head towards it.',
        nextId: 'village'
    },
    joinGarden: {
        text: 'You join the Bulbasaurs and the Oddish in their playful activities and become quick friends. After a while, you tell them about your journey to find your family. To your surprise, they perk up and say that they saw some concerned Eevees further up the path. You excitedly thank them and rush ahead',
        nextId: 'continueGarden'
    },
    continueGarden: {
        text: 'You rush ahead and catch a glimpse of your family in the distance. You run towards them and are overjoyed to be reunited. You introduce them to your new friends and they lead you and your family to a village run by Squirtles',
        nextId: 'villageParents'
    },
    village: {
        text: 'You head towards the village and find a bustling community of Pokemon. You can either explore the village or ask the villagers for help in finding your family.',
        choices: [
            { text: 'explore the village', nextId: 'exploreVillage' },
            { text: 'ask the villagers for help', nextId: 'askVillagers' }
        ]
    },
    hiddenPath: {
        text: 'You take the hidden path and find yourself in a serene forest with two paths ahead. One path is dark and the other is narrow. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    exploreVillage: {
        text: 'You explore the village and find a variety of shops and friendly Pokemon. You also find out that the village is run by a family of Squirtles. They offer to help you find your family and provide you with some supplies for your journey. You can either accept their help or continue on your own.',
        choices: [
            { text: 'accept the Squirtles help', nextId: 'acceptHelp' },
            { text: 'continue on your own', nextId: 'continueVillage' }
        ]
    },
    askVillagers: {
        text: 'You ask the villagers for help and a friendly Charmander offers to guide you to a nearby forest where they believe your family may be. You can either follow the Charmander or continue on by yourself.',
        choices: [
            { text: 'follow the Charmander', nextId: 'followCharmander' },
            { text: 'continue on your own', nextId: 'continueVillage' }
        ]
    },
    acceptHelp: {
        text: 'You accept the Squirtles help and they provide you with supplies for your journey. They also give you a map that shows the location of a nearby forest where they believe your family is. You can either follow the map or continue on your own.',
        choices: [
            { text: 'follow the map', nextId: 'followMap' },
            { text: 'continue on your own', nextId: 'continueVillage' }
        ]
    },
    continueVillage: {
        text: 'You continue on your own and find yourself in a dense forest. You can either go down a dark path or a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    followCharmander: {
        text: 'You follow the Charmander and they lead you to a nearby forest where they believe your family may be. You can either go down a dark path or a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    followMap: {
        text: 'You follow the map and it leads you to a nearby forest where they believe your family may be. You can either go down a dark path or a narrow path. Which path do you choose?',
        choices: [
            { text: 'take the dark path', nextId: 'darkPath' },
            { text: 'take the narrow path', nextId: 'narrowPath' }
        ]
    },
    villageParents: {
        text: 'You arrive at the village run by Squirtles where you and your family are warmly welcomed. Your new friends help you and your family settle in and you all live happily ever after.',
        nextId: 'end'
    },
    end: {
        text: 'The End! Thank you for playing!'
    }
    }

