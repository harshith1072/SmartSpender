const express = require('express');
const { Webhook } = require('svix');
const router = express.Router();
require('dotenv').config();

router.post('/api/webhook', async function (req, res) {
  try {
    const payloadString = JSON.stringify(req.body);
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;
    // Handle the webhooks
    const eventType = evt.type;
    console.log('webhook here ----------------->')
    if (eventType === 'user.created') {
      console.log(`User ${id} was ${eventType}`);

      // Export user data for insertion
      res.locals.userData = {
        clerkUserId: id,
        firstName: attributes.first_name,
        lastName: attributes.last_name,
      };
    }
    else if(eventType === 'session.created') {
      console.log(`Session ${id} was ${eventType}`);
      res.locals.userData = {
        clerkUserId: id,
      };
    }
    console.log(res.locals.userData);
    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
    
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;