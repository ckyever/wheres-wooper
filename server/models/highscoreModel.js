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

const updateEmptyHighscoreUsername = async (id, username) => {
  try {
    const result = await prisma.highscore.update({
      where: {
        id: Number(id),
        username: null,
      },
      data: {
        username: username,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getHighscores = async () => {
  try {
    const highscores = await prisma.highscore.findMany({
      orderBy: [
        {
          time: "asc",
        },
        { id: "desc" },
      ],
    });
    return highscores;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertHighscore, updateEmptyHighscoreUsername, getHighscores };
