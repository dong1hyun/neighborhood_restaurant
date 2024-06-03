import { atom } from "recoil";

export const keyword = atom({
    key:"keyword",
    default: ""
});

export const neighborhood_search = atom({
    key:"neighborhood_search",
    default: false
})

export const loginState = atom({
    key:"login",
    default: false
})

export const signinState = atom({
    key:"signin",
    default: false
})

export const session = atom({
    key:"session",
    default: ''
})

export const name = atom({
    key:"name",
    default: ''
})