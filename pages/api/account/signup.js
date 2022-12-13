import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

const handler = nc().post(async (req, res) => {
  await dbConnect();
  const { name, password, email } = req.body;
  try {
    if (!(name && password && email)) {
      throw new Error('缺少註冊資訊');
    }
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('此email已被註冊');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error?.message || '發生錯誤' });
  }
});

export default handler;
