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
    const session = await prisma.session.update({
      where: {
        id: Number(id),
      },
      data: {
        start_time: startDateTime,
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSessionEndTime = async (id, endDateTime) => {
  try {
    const session = await prisma.session.update({
      where: {
        id: Number(id),
      },
      data: {
        end_time: endDateTime,
      },
    });
    return session;
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

export {
  insertSession,
  updateSessionStartTime,
  updateSessionEndTime,
  deleteSession,
};
