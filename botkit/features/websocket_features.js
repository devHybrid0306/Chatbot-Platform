/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const watsonMiddleware = require('../middleware/watson-middleware');


module.exports = function(controller) {

    if (controller.adapter.name === 'Web Adapter') {
        console.log('Loading sample web features...');
        controller.hears(new RegExp('.*'), 'message', async function(bot, message) {
            await watsonMiddleware.middleware.interpret(bot, message)
            if (message.watsonError) {
                
              bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
            } else {
                //console.log(message.watsonData)
                bot.reply(message, {
                    text:message.watsonData.output.text.join('\n'),
                    quick_replies:message.watsonData.output.quick_replies

                });
            }
      });
       /* controller.hears(new RegExp('quick'), 'message', async (bot, message) => {

            await bot.reply(message,{
                text: 'Here are some quick replies',
                quick_replies: [
                    {
                        title: 'Foo',
                        payload: 'foo',
                    },
                    {
                        title: 'Bar',
                        payload: 'bar',
                    }
                ]
            });
        }); */


    }

}