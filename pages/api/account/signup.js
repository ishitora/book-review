import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

const handler = nc().post(async (req, res) => {
  await dbConnect();
  const { name, password, email } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

export default handler;
