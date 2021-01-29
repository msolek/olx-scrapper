import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Announcement } from "../entities/Announcement";
import {
  scrapeName,
  checkIsAnnouncementActive,
  getUserProfile,
} from "../scrapper/scrapperService";

//TODO:pagination
@Resolver()
export class AnnouncementResolver {
  @Query(() => [Announcement])
  async announcements(): // @Arg("limit") limit: number,
  // @Arg("offset") offset: number
  Promise<Announcement[]> {
    //return Announcement.find();
    const qb = getConnection()
      .getRepository(Announcement)
      .createQueryBuilder("p")
      .orderBy('p."createdAt"', "DESC")
      .take();
    const annnouncements = await qb.getMany();
    return annnouncements;
  }
  @Query(() => Announcement, { nullable: true })
  async announcement(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("description", () => String, { nullable: true }) description: string
  ): Promise<Announcement | null> {
    const ann = await Announcement.findOne(id);
    if (!ann) {
      return null;
    }
    if (typeof name !== "undefined") {
      ann.name = name;
      ann.description = description;
      await Announcement.update({ id }, { name, description });
    }
    return ann;
  }
  @Mutation(() => Announcement)
  async createAnnouncement(
    @Arg("url") url: string,
    name: string,
    img: string,
    isActive: boolean,
    userProfile: string | undefined
  ): Promise<Announcement> {
    userProfile = await getUserProfile(url);
    isActive = await checkIsAnnouncementActive(url);
    await scrapeName(url, function (callback: any) {
      name = callback.title;
      img = callback.imgURL;
    });
    return Announcement.create({
      url,
      name,
      img,
      isActive,
      userProfile,
    }).save();
  }
  @Mutation(() => Boolean)
  async deleteAnnouncement(@Arg("id") id: number): Promise<boolean> {
    await Announcement.delete(id);
    return true;
  }
}
