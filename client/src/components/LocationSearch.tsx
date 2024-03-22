const { kakao } = window as any;

const geocoder = new kakao.maps.services.Geocoder();

geocoder.addressSearch("서울 대현동", function (result: any, status: any) {
    console.log(result)
})

export function LocationSearch() {
    return (
        null
    )
}