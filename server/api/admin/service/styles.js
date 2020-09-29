import express from "express";
import { checkClientCredentials } from 'server/middlewares';
import { Styles } from "server/models";

export const adminServiceStylesRouter = express.Router();

adminServiceStylesRouter.get('/:service/:domainId', checkClientCredentials, async (req, res) => {
  try {
    const { params: { service, domainId } } = req;
    const styles = await Styles.findOne({ domain: domainId, service })

    res.json(styles || {});
  } catch (e) {
    res.status(e.status || 500).json({ messsage: e.message });
  }
});

adminServiceStylesRouter.post('/:service/:domainId', checkClientCredentials, async (req, res) => {
  try {
    const { params: { service, domainId }, body } = req;
    const styles = await Styles.findOneAndUpdate(
      { domain: domainId, service },
      { $set: { styles: body } },
      { upsert: true, new: true },
    );

    res.json(styles);
  } catch (e) {
    res.status(e.status || 500).json({ messsage: e.message });
  }
});
