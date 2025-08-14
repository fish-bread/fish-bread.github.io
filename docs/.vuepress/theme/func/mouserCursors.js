import { setANICursor } from "ani-cursor.js";
//指针函数
export const setCursor = () => {
    setANICursor(
        "body", 
        "/images/cursors/正常选择.ani",
        "auto",
        32,
        32,
    );
}
