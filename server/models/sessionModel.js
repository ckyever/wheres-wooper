import { prisma } from "../lib/prisma.js";

const insertSession = async (targetIds) => {
  try {
    const session = await prisma.session.create({
      data: {
        target_ids: targetIds,
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSessionStartTime = async (id, startDateTime) => {
  try {
    const result = await prisma.session.updateMany({
      where: {
        id: Number(id),
        start_time: null,
      },
      data: {
        start_time: startDateTime,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteSession = async (id) => {
  try {
    const session = await prisma.session.delete({
      where: {
        id: Number(id),
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSessionStartTime = async (id) => {
  try {
    const result = await prisma.session.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        start_time: true,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  insertSession,
  updateSessionStartTime,
  deleteSession,
  getSessionStartTime,
};
