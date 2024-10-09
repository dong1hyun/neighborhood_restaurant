export const SliderVar = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -window.outerWidth + (window.outerWidth / 10) : window.outerWidth - (window.outerWidth / 10),
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? window.outerWidth - (window.outerWidth / 10) : -window.outerWidth + (window.outerWidth / 10),
    }),
};

export interface restaurantForm {
    img: string,
    restaurantId: Number,
    restaurantName: string
}

