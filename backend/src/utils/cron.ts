import { Announcement } from "../entities/Announcement";
import { getConnection } from "typeorm";
import { scrapePrice } from "../scrapper/scrapperService";
import { AnnouncementData } from "../entities/AnnouncementData";
const cron = require("node-cron");

export const cronGetPriceForActiveAnnouncements = async () => {
  //cron every 5 minutes
  cron.schedule("*/5 * * * *", async function () {
    let activeAnnouncements = await getConnection()
      .createQueryBuilder()
      .select("announcement")
      .from(Announcement, "announcement")
      .where("announcement.isActive = true")
      .getMany();

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
