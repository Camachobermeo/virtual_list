import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {

    public baseApiPath: string = environment.url;
    
    constructor() {

    }
}
