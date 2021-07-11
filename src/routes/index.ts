import { Router } from "express";

import blackjackRoutes from './blackjack';
import page404 from './pages/404';
import pageRoot from "./pages/root";

const router = Router();

router.use(`/blackjack`, blackjackRoutes);

router.use(pageRoot);
router.use(page404);

export default router;
