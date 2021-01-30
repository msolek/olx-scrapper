import { Announcement } from "../entities/Announcement";
import { getConnection } from "typeorm";
import {
  scrapePrice,
  checkIsAnnouncementActive,
} from "../scrapper/scrapperService";
import { AnnouncementData } from "../entities/AnnouncementData";
const cron = require("node-cron");

export const cronGetPriceForActiveAnnouncements = async () => {
  //cron every 5 minutes
  cron.schedule("*/5 * * * *", async function () {
    const activeAnnouncements = await getActiveAnnouncements();

    for (const announcement of activeAnnouncements) {
      let priceTemp = 0;
      await scrapePrice(announcement.url).then((price) => {
        priceTemp = price;
      });
      await insertPriceDetails(priceTemp, announcement.id);
    }
  });
};

export async function insertPriceDetails(
  priceValue: number,
  announcementId: number
) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(AnnouncementData)
    .values([
      {
        price: priceValue,
        announcement: announcementId,
      },
    ])
    .execute();
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  return await getConnection()
    .createQueryBuilder()
    .select("announcement")
    .from(Announcement, "announcement")
    .where("announcement.isActive = true")
    .getMany();
}
export async function setAnnouncementIsNotActive(id: number) {
  await getConnection()
    .createQueryBuilder()
    .update(Announcement)
    .set({ isActive: false })
    .where("id = " + id)
    .execute();
}
export const cronCheckIsAnnouncementActive = async () => {
  //cron every 10 minutes
  cron.schedule("*/10 * * * *", async function () {
    const activeAnnouncements = await getActiveAnnouncements();
    for (const announcement of activeAnnouncements) {
      await checkIsAnnouncementActive(announcement.url).then((isActive) => {
        if (isActive === false) {
          setAnnouncementIsNotActive(announcement.id);
        }
      });
    }
  });
};
