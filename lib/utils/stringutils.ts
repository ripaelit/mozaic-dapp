export const safehexstr = (value:any) => {
    if (typeof(value) == "number") {
        return '0x' + value.toString(16)
    }
    else if (typeof(value) == "string") {
        if (value.indexOf("0x")==0) {
            return value
        }
        else if (Number.parseInt(value).toString() == value) {
            return '0x' + Number.parseInt(value).toString(16)
        }
        else {
            throw Error(`safehexstr: Unexpected value - ${value}`)
        }
    }
}