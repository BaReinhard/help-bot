let { singleImageCard, createTextCard } = require("hangouts-card-helper");
let isValid = require("hangout-chat-tester");

module.exports = function helpBot(req, res) {
  // Log Body for Debugging
  console.log(JSON.stringify(req.body));
  switch (req.body.type) {
    case "ADDED_TO_SPACE":
      res.send(handleAddToSpace(req, res));
      break;
    case "MESSAGE":
      res.send(handleMessage(req, res));
      break;
    case "CARD_CLICKED":
      res.send(handleCardClick(req, res));
      break;
  }
};

function handleAddToSpace(req, res) {}
function handleCardClick(req, res) {}
function handleMessage(req, res) {
  // Destructure Objects in Chat Message Payload
  let { user, message, space } = req.body,
    { sender, annotations } = message;

  // Lowercase Text Sent from Bot
  let text = message.text.toLowerCase();
  // Create a response card
  // createTextCard returns {text:"Your Text here"}
  // View for more options: https://developers.google.com/hangouts/chat/reference/rest/v1/cards
  // Return text you sent to the bot without @helpbot
  let card = createTextCard(text.replace("@helpbot ", ""));

  // isValid checks to ensure only allowed properties are passed
  let result = isValid(card);
  if (result) {
    res.send(card);
  } else {
    res.send({ text: "Sorry, an error has occurred" });
  }
}
