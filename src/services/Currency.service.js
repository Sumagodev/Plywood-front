import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/currency`;


export const getCurrency = async () => {
    return axiosApiInstance.get(`${serverUrl}`)
}

export const getconvertIntoCurrencyPriceWithSymbol =  (price) => {
   let convertRate = localStorage.getItem('currency-conver-rate');
   let currencyObj = JSON.parse(convertRate);
        if(convertRate){
             let  convetPrice = Math.round(currencyObj?.convertRate*price);
        //  console.log(`${currencyObj?.symbol}  ${convetPrice}` ,"currencyObj")

            return `${currencyObj?.symbol} ${convetPrice}` 
        }
}

export const getconvertIntoCurrencyPriceWithOutSymbol =  (price) => {
    let convertRate = localStorage.getItem('currency-conver-rate');
    let currencyObj = JSON.parse(convertRate);
         if(convertRate){
              let  convetPrice = Math.round(currencyObj?.convertRate*price);
                    return convetPrice;
         }
 }

 export const getCurrencyPriceSymbol =  (price) => {
    let convertRate = localStorage.getItem('currency-conver-rate');
    let currencyObj = JSON.parse(convertRate);
         if(convertRate){
             
                    return currencyObj?.symbol;
         }
 }

export const getCurrencyRate =  () => {

    return localStorage.getItem("currency-conver-rate")
  }
 

export const setCurrencyRate =  (obj) => {

   let currencyObj = JSON.stringify(obj)
    localStorage.setItem("currency-conver-rate",currencyObj)
     return obj;
 }


 export const getCountryFromLocal =  () => {

    return localStorage.getItem("country-from-ip")
  }
 

export const setCountryFromLocal =  (name) => {

//    let countryname = JSON.stringify(name)
    localStorage.setItem("country-from-ip",name)
     return name;
 }



