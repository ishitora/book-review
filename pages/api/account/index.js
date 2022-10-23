import nc from 'next-connect';

import userExtractor from '@/middlewares/userExtractor';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
})
  .use(userExtractor)
  .get(async (req, res) => {
    res.json(req.user);
  });

export default handler;
