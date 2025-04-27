const prisma = require("../config/prisma");

exports.listStats = async (req, res, next) => {
  try {
    const usersCount = await prisma.profile.count();

    res.json({ 
      usersCount: usersCount,
    });
  } catch (error) {
    next(error);
  }
};