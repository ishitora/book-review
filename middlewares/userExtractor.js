import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { decode } from 'next-auth/jwt';

const userExtractor = async (req, res, next) => {
  try {
    await dbConnect();

    if (
      (!req?.cookies?.token || !req?.cookies?.token.startsWith('Bearer')) &&
      !req?.cookies?.['next-auth.session-token'] &&
      !req?.cookies?.['__Secure-next-auth.session-token']
    ) {
      return res.status(401).json({ message: 'token missing' });
    }
    let token;
    let decodedToken;
    if (
      req?.cookies['next-auth.session-token'] ||
      req?.cookies?.['__Secure-next-auth.session-token']
    ) {
      token =
        req?.cookies['next-auth.session-token'] ||
        req?.cookies?.['__Secure-next-auth.session-token'];
      decodedToken = await decode({ secret: process.env.JWT_SECRET, token });
      if (!decodedToken.email) {
        return res.status(401).json({ message: 'token missing or invalid' });
      } else {
        req.user = await User.findOne({ email: decodedToken.email });
      }
    } else {
      token = req.cookies.token.replace('Bearer ', '');
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ message: 'token missing or invalid' });
      } else {
        req.user = await User.findById(decodedToken.id);
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error?.message || 'some error' });
  }
};

export default userExtractor;
