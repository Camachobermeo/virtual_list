import { Injectable } from '@angular/core';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {

    public baseApiPath: string = "http://localhost:8080/ShrimpSoftServer/";
    
    constructor() {

    }
}
