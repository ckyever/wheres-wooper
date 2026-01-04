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

const getTopHighscores = async () => {
  try {
    const highscores = await prisma.highscore.findMany({
      take: 10,
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

const getHighscoreRankPreview = async (highscoreId) => {
  try {
    const highscores = await prisma.$queryRaw`
      WITH leaderboard AS (
        SELECT 
          id, 
          "date",
          "time", 
          username,
          ROW_NUMBER() OVER (ORDER BY "time" ASC, id ASC) as rank
        FROM "highscore"
      )
      SELECT * FROM leaderboard
      WHERE rank BETWEEN
        (SELECT rank - 1 FROM leaderboard WHERE id = ${highscoreId}) 
        AND 
        (SELECT rank + 1 FROM leaderboard WHERE id = ${highscoreId})
      ORDER BY rank ASC;
    `;
    return highscores;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  insertHighscore,
  updateEmptyHighscoreUsername,
  getTopHighscores,
  getHighscoreRankPreview,
};
