let { singleImageCard, createTextCard } = require('hangouts-card-helper');
let isValid = require('hangout-chat-tester');
module.exports = function helpBot(req, res) {
    console.log(req.body)
    switch (req.body.type) {
        case 'ADDED_TO_SPACE':
            res.send(handleAddToSpace(req, res));
            break;
        case 'MESSAGE':
            res.send(handleMessage(req, res));
            break;
        case 'CARD_CLICKED':
            res.send(handleCardClick(req, res));
            break;
    }
}

function handleAddToSpace(req, res) {

}
function handleCardClick(req, res) {

}
function handleMessage(req, res) {
    let { user, message, space } = req.body,
        { sender, annotations } = message;

    let text = message.text.toLowerCase();
    let card = createTextCard(text.replace("@helpbot ", ""));

    let result = isValid(card);
    if (result) {
        res.send(card);
    } else {
        res.send({ text: "Sorry, an error has occurred" })
    }
}