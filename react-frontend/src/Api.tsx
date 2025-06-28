import { MembershipList } from "./Type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchMembers = async (): Promise<MembershipList> => {
    const members =  fetch(`${BASE_URL}/api/course/members`)
        .then(res => res.json());
    console.log(JSON.stringify(members));
    return members;
}