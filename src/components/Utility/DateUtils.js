export const DisplayDate = (value, format) => {
    if (format) {
        if (`${format}`.toLowerCase() == "dd/mm/yyyy".toLowerCase()) {
            return `${new Date(value).getDate()}/${new Date(value).getMonth() + 1}/${new Date(value).getFullYear()}`
        }
        else if (`${format}`.toLowerCase() == "dd-mm-yyyy".toLowerCase()) {
            return `${new Date(value).getDate()}-${new Date(value).getMonth() + 1}-${new Date(value).getFullYear()}`
        }
        else if (`${format}`.toLowerCase() == "mm-dd-yyyy".toLowerCase()) {
            return `${new Date(value).getMonth() + 1}-${new Date(value).getDate()}-${new Date(value).getFullYear()}`
        }
        else if (`${format}`.toLowerCase() == "mm/dd/yyyy".toLowerCase()) {
            return `${new Date(value).getMonth() + 1}/${new Date(value).getDate()}/${new Date(value).getFullYear()}`
        }
    }
    else {
        return `${new Date(value).getDate()}/${new Date(value).getMonth() + 1}/${new Date(value).getFullYear()}`
    }
}