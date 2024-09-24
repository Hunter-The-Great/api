import data from "../activities.json";
import { prisma } from "./db";
const load = async () => {
  for (const activity of data.thing) {
    await prisma.activity.create({
      data: {
        key: activity.key,
        activity: activity.activity,
        availability: activity.availability,
        type: activity.type,
        participants: activity.participants,
        price: activity.price,
        accessibility: activity.accessibility,
        duration: activity.duration,
        kidFriendly: activity.kidFriendly,
        link: activity.link,
      },
    });
  }
};

export { load };
