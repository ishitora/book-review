import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

const userExtractor = async (req, res, next) => {
  try {
    await dbConnect();
    if (!req?.cookies?.token || !req?.cookies?.token.startsWith('Bearer')) {
      return res.status(401).json({ message: 'token missing' });
    }

    const token = req.cookies.token.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ message: 'token missing or invalid' });
    } else {
      req.user = await User.findById(decodedToken.id);
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: error?.message || 'some error' });
  }
};

export default userExtractor;
