import jwt from 'jsonwebtoken'

export default class Token {

    private static seed: string = 'semillaSecreta';
    private static caducidad: string = '40d';

    constructor(){
    }

    static getJWToken(payload: any): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static compararToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if(err) {        // token no confiable
                    reject();
                }
                else {            // token confiable
                    resolve(decoded);
                }
            });
        });
    }

}