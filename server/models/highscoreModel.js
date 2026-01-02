import { prisma } from "../lib/prisma.js";

const insertHighscore = async (time) => {
  try {
    const highscore = await prisma.highscore.create({
      data: {
        time: Number(time),
      },
    });
    return highscore;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const countHighscore = async () => {
  try {
    const highscoreCount = await prisma.highscore.count();
    return highscoreCount;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSlowestHighscore = async () => {
  try {
    const highscore = await prisma.highscore.findFirst({
      orderBy: {
        time: "desc",
      },
      select: {
        id: true,
        time: true,
      },
    });
    return highscore;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteHighscore = async (id) => {
  try {
    const highscore = await prisma.highscore.delete({
      where: {
        id: id,
      },
    });
    return highscore;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  insertHighscore,
  countHighscore,
  getSlowestHighscore,
  deleteHighscore,
};
