let { singleImageCard, createTextCard } = require("hangouts-card-helper");
let isValid = require("hangout-chat-tester");

module.exports = function helpBot(req, res) {
  // Log Body for Debugging
  console.log(JSON.stringify(req.body));
  switch (req.body.type) {
    case "ADDED_TO_SPACE":
      handleAddToSpace(req, res);
      break;
    case "MESSAGE":
      handleMessage(req, res);
      break;
    case "CARD_CLICKED":
      handleCardClick(req, res);
      break;
    default:
      res.send({
        text: "This is the action type sent by the bot " + req.body.type
      });
  }
};

function handleAddToSpace(req, res) {
  res.send({ text: "Welcome Message" });
}
function handleCardClick(req, res) {
  res.send({ text: "Card Click Yet to Be implemented" });
}
function handleMessage(req, res) {
  // Destructure Objects in Chat Message Payload
  let { user, message, space } = req.body,
    { sender, annotations } = message;

  // Lowercase Text Sent from Bot
  let text = message.text.toLowerCase();

  // Change Remove @helpbot from the text
  text = text.replace("@helpbot ", "");

  // Create a response card
  // createTextCard returns {text:"Your Text here"}
  // View for more options: https://developers.google.com/hangouts/chat/reference/rest/v1/cards

  let card = createTextCard(text);

  // isValid checks to ensure only allowed properties are passed
  let result = isValid(card);
  if (result) {
    res.send(card);
  } else {
    res.send({ text: "Sorry, an error has occurred" + JSON.stringify(card) });
  }
}
