import express from 'express';
import { noValidDataError } from 'server/utils/errors';
import { checkClientCredentials } from 'server/middlewares';
import { Client } from '../../models';

export const clientRouter = express.Router();

clientRouter.post('/signup', async ({ body: { username, password, email }, query: { lang } }, res) => {
 try {
  const { _id, domains, username: user, email: mail, token } = await Client.saveClientWithNewToken({
    username,
    password,
    email,
  }, lang, 'new');

  res.json({ _id, domains, username: user, email: mail, token });
 } catch (e) {
   if (e.message.indexOf('duplicate key') !== -1) {
    const error = noValidDataError(lang);
    res.status(error.status || 500).json({ message: error.message })
   } else {
    res.status(e.status || 500).json({ message: e.message });
   }
 }
});

clientRouter.post('/signin', async ({ query: { lang }, body: { username, password }, }, res) => {
  try {
    const { _id, email, username: nameuser, token } = await Client.saveClientWithNewToken({
      username,
      password,
    }, lang);

   res.json({ _id, email, token, username: nameuser });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
 });

 clientRouter.get('/', checkClientCredentials, async ({ client }, res) => {
  try {
    const { _id, email, username, token } = client;
    res.json({ _id, email, username, token });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
 });
