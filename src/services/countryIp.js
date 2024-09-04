import axios from "axios";
import { timeZoneCityToCountry } from "../utils/country";

export const getIp = () => {
    let userRegion;
    let userCity;
    let userCountry;
    let userTimeZone;
    
    if (Intl) {
      userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let tzArr = userTimeZone.split("/");
      userRegion = tzArr[0];
      userCity = tzArr[tzArr.length - 1];
      userCountry = timeZoneCityToCountry[userCity];
    }
    
    return  userCountry;
};
