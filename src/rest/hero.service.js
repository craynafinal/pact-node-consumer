// hero.service.js
import Hero from "./../hero";
const axios = require('axios');
import adapter from 'axios/lib/adapters/http';

class HeroService {

    constructor(baseUrl, port){
        this.baseUrl = baseUrl;
        this.port = port;
    }

    // this is a service that requests a resource from another endpoint.
    createHero(hero) {
        return axios.request({
            method: 'POST',
            url: `/heroes`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: hero
        }, adapter);
    };

}

export default HeroService;