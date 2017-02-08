/**
 * Created by Aakarsh on 2/5/17.
 */
var generateMessage = function (from , text) {
  return {
      from: from,
      text: text,
      createdAt: new Date().getTime()
  }
};

module.exports  = {generateMessage};