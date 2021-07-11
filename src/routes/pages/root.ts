import { Router } from 'express';

const router = Router();

router.get('/_health', (req, res) => {
  res.status(200).json({status: 'Alive & thriving'});
});

export default router;
