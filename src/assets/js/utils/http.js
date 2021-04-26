import axios from "axios"
import qs from "qs"
export function request(config={}) {
    let service = axios.create({
        baseURL: process.env.VUE_APP_API,
        timeout: 3000,
        headers: {
            
        }
    });
    service.interceptors.request.use(function (config) {
        //console.log(config);
        if(config.method === "post") {
            config.data = qs.stringify(config.data);
        } else if(config.method === "file") {
            config.method = "post";
            //console.log(config.data);
            if(config.data && config.data instanceof Object) {
                let params = new FormData();
                for(let key in config.data) {
                    params.append(key, config.data[key]);
                }
                config.data = params;
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    service.interceptors.response.use(function (response) {
        //console.log(response);
        if(response.request.responseURL === response.config.baseURL + "/home/user/safe?token=1ec949a15fb709370f") {
            if(response.data.code !== 200) {
                //window.location.href = "http://lucklnk.com";
            }
        }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
    return service.request(config).then(res => res.data);
}