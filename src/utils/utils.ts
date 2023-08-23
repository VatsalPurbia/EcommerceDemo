import randomstring from "randomstring";
import otpgen from "otp-generator";
import { dereference } from "@apidevtools/json-schema-ref-parser";
class Utils {
  otpGenerator(digits: number) {
    return otpgen.generate(digits, { specialChars: false, digits: true });
  }
  generateRandomString(digits: number) {
    return randomstring.generate(digits);
  }
  async constructSwaggerSchema() {
    await dereference("./swagger/swagger.json");
  }
}
export const utils = new Utils();
