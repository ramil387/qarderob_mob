import profileStates from "@/states/profile/profileStates"
import { toJS } from "mobx";

export const fillProfileForm = () => {
    const user = toJS(profileStates.user);
    profileStates.setEmail(user?.email ?? "");
    profileStates.setFullName(user?.full_name ?? "");
    profileStates.setUsername(user?.username ?? "");
    profileStates.setPhone('+994' + user?.phone.slice(1) ?? "");
    if (user?.photo) profileStates.setProfileCover({ name: user?.photo })
    if (user?.cover) profileStates.setProfileImg({ name: user?.cover })
}