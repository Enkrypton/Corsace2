import { DiscordOAuth, OsuOAuth, User } from "../../../Models/user";
import { User as APIUser } from "nodesu";
import { osuClient } from "../../osu";
import { discordClient } from "../../discord";

export default async function getUser (ID: number | string, IDType: "osu" | "discord", save: false): Promise<User | undefined>;
export default async function getUser (ID: number | string, IDType: "osu" | "discord", save: true): Promise<User>;
export default async function getUser (ID: number | string, IDType: "osu" | "discord", save: boolean): Promise<User | undefined> {
    let user = await User.findOne({ where: { [IDType]: { userID: ID.toString() } }});
    if (user)
        return user;
    if (!save)
        return;

    user = new User();
    if (IDType === "osu") {
        user.osu = new OsuOAuth();
        user.osu.userID = ID.toString();
        const apiUser = await osuClient.user.get(ID) as APIUser;
        if (apiUser) {
            user.osu.username = apiUser.username;
            user.osu.avatar = `https://a.ppy.sh/${apiUser.id}`;
            user.country = apiUser.country;
        }
    } else if (IDType === "discord") {
        user.discord = new DiscordOAuth();
        user.discord.userID = ID.toString();
        const apiUser = await discordClient.users.fetch(ID.toString());
        if (apiUser) {
            user.discord.username = apiUser.username;
            user.discord.avatar = apiUser.displayAvatarURL();
        }
    }
    user = await user.save();
    return user;
}
