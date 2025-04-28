import numeral from "numeral"
import moment from "moment/min/moment-with-locales";
export const fromatNumber = (number)=>{
      return numeral(number).format("0,0")
}

export const formatDate = (date)=>{
      return moment(date).locale('th').format("ll")
}