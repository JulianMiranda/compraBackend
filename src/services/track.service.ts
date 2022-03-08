/* import { Injectable, Logger,    HttpService } from '@nestjs/common';
import { User } from '../dto/user.dto';


@Injectable()
export class TrackService {
    constructor(private http: HttpService) {}
  private static readonly logger = new Logger(TrackService.name);
  static init() {}


 
  static async trackService( user: Partial<User>) {
    const info= [];

    
    for (const code of user.codes) {
     

       const result = await this.fetchPosts(code);

      }

      const fetchPosts =async(code) =>{
        return this.http
          .get(`https://www.correos.cu/wp-json/correos-api/envios/${code}/2021/web/`)
          .toPromise();
      }
   console.log(info);
   
   
    
  }

  
} */
import { Injectable, HttpService } from '@nestjs/common';
import { User } from 'src/dto/user.dto';

@Injectable()
export class TrackService {
  constructor(private http: HttpService) {}

  
  async fetchPosts(code) {
    return this.http
    .get(`https://www.correos.cu/wp-json/correos-api/envios/${code}/2021/web/`)
      .toPromise();
  }

  async trackService( user: Partial<User>): Promise<any> {
    try {
        for (const code of user.codes) {
     

            const result = await this.fetchPosts(code);
              }
    
    } catch (e) {
      return [];
    }
  }
}
