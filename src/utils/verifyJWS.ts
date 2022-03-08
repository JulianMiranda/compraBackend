const jwt = require('jsonwebtoken');
import { JWT_KEY } from "src/config/config";



  
export const verifyJWT = ( token = '' ): Array<any> => {

    try {
        const { phone } = jwt.verify( token, JWT_KEY );

        return [ true, phone ];

    } catch (error) {
        return [ false, null ];
    }

}