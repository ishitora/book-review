import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import axios from 'axios';
const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  // const note = getNote(req.query.id)

  // if (!note) {
  //   res.status(404)
  //   res.end()
  //   return
  // }
  console.log('k', req.query);

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${
      req.query.keyword
    }&key=AIzaSyDqcZhr7sjpyzbjSd9BU6FWC2TUpUCwpHk&filter=paid-ebooks&langRestrict=tw&maxResults=20&startIndex=${
      (Number(req.query.p) - 1) * 20
    }`
  );

  console.log(response.data);
  res.json(response.data);
});

export default handler;
