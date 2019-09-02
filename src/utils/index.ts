// import Cookie from "js-cookie"
// //添加名字：
// let key="authorization" //authorization 授权，
// //设置cookie----过期时间
// export function setToken(value:any){
//     let date=new Date()
//     let endTime = new Date()*1 + 10*60*60*1000;
//     date.setTime(endTime);
//     Cookie.set(key, value, {expires: date})
// }
// //获取cookie
// export function getToken(){
//    return  Cookie.get(key)
// }
// //删除cookie
// export function removeToken(){
//     Cookie.remove(key)
// }
import Cookie from "js-cookie";

let key="dateTime";
export function setCookie(value:any){
  
    let date=new Date();
    let expries=date.getTime()+14*24*60*60*1000;
    date.setTime(expries)
    Cookie.set(key,value,{expires:date})
}

export function getCookie(){
    return Cookie.get(key);

}

export function removeCookie(){
  return  Cookie.remove(key);
}