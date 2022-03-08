const jwt = require('jsonwebtoken');
import { JWT_KEY } from 'src/config/config';




export const generarJWT = ( phone: string ): Promise<string> => {

    return new Promise(  ( resolve, reject ) => {       

        const payload = { phone };
        jwt.sign( payload, JWT_KEY, {
            expiresIn: '744h'
        }, ( err, token ) => {            
            if ( err ) {
                reject('No se pudo generar el JWT');
            } else {
                
                resolve( token );
            }

        });
    });
    
}