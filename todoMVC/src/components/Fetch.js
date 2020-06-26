// 封装get请求
export function httpGet(url){
    var result = fetch(url)
    return result
}
// 封装post请求
export function httpPost(url,data){
    var result = fetch(url,{
        method:'post',
        mode: "cors",
        headers:{
            'Accept':'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
            'Content-Type':'application/x-www-form-urlencoded'/* 请求内容类型 */
        },
        //data表单数据，body最终要的格式为username=tony&pwd=123456，所以需要格式化
        body:paramsPostBody(data)
    })
    return result
}
//格式化data
function paramsPostBody(obj){
    var result = '';//接受最后结果
    var item;
    for(item in obj){
        result += '&'+item+'='+encodeURIComponent(obj[item])
    }
    if(result){
        result = result.slice(1)//去掉第一个&
    }
    return result
} 