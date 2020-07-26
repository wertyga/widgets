import express from 'express';

const langs = {
    en: 'English',
    ru: 'Русский',
};

export const etcRouter = express.Router();

etcRouter.get('/', async (req, res) => {
 try {
  res.json({
      langs,
  })
 } catch (e) {
   res.status(e.status || 500).json({ messsage: e.message });
 }
});