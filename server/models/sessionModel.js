import { prisma } from "../lib/prisma";

const insertSession = async () => {
  try {
    const session = await prisma.session.insert();
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
        id: id,
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
        id: id,
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertSession, updateSessionEndTime, deleteSession };
