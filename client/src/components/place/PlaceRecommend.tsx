import axios from "axios"

export default function PlaceRecommend({address}: {address: string}) {
    const params = {address};
    axios.get(`/placeDetail/placeRecommend`, {params});
    return <div>

    </div>
} 