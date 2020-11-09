import express from "express";
import { checkClientCredentials } from 'server/middlewares';
import { Styles, Domain } from "server/models";

export const adminServiceStylesRouter = express.Router();

adminServiceStylesRouter.get('/:service/:domainId', checkClientCredentials, async (req, res) => {
  try {
    const { params: { service, domainId } } = req;
    const [dbStyles, domain] = await Promise.all([
      Styles.findOne({ domain: domainId, service }),
      Domain.findById(domainId),
    ]);

    const { styles } = dbStyles || {};
    res.json({ styles, domain });
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
