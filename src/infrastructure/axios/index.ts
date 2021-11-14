import axios from "axios";

const apiService=axios.create({
    baseURL:"http://www.baidu.com"
})

apiService.defaults.headers.common["token"]=""