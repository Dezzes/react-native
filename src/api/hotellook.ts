import axios from "axios";

export default axios.create({
    baseURL: 'http://engine.hotellook.com/api/v2',
    params: {
        lang: "ru",
        lookFor: "hotel",
        limit: 10,
        convertCase: 1
    }
})