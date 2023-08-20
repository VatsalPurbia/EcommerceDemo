import randomstring from 'randomstring';
import otpgen from 'otp-generator';
class Utils{
    otpGenerator(digits:number){
        return otpgen.generate(digits,{specialChars:false,digits:true})
    }
    generateRandomString(digits: number) {
        return randomstring.generate(digits);
    }
}
export const utils=new Utils();