import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Announcement } from "../entities/Announcement";
@Resolver()
export class AnnouncementResolver {
  @Query(() => [Announcement])
  async announcements(): // @Arg("limit") limit: number,
  // @Arg("offset") offset: number
  Promise<Announcement[]> {
    return Announcement.find();
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
  async createAnnouncement(@Arg("url") url: string): Promise<Announcement> {
    // await scrapeName(url, callback({}));
    return Announcement.create({ url }).save();
  }
  @Mutation(() => Boolean)
  async deleteAnnouncement(@Arg("id") id: number): Promise<boolean> {
    await Announcement.delete(id);
    return true;
  }
}
