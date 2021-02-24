import { Injectable } from '@angular/core';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {

    public baseApiPath: string = "http://localhost/virtual-list-backend/";
    // public baseApiPath: string = "https://warm-mesa-04446.herokuapp.com/";
    // public baseApiPath: string = "https://virtual-list.000webhostapp.com/";
    
    constructor() {

    }
}
