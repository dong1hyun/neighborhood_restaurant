import { atom } from "recoil";

export const keyword = atom({
    key:"keyword",
    default: ""
});

export const neighborhood_search = atom({
    key:"neighborhood_search",
    default: false
})