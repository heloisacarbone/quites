// Return a dictionary with the cookies list
function getCookies() {
     var obj = {};
     var str = document.cookie;
         str = str.split(';');
     for (var i = 0; i < str.length; i++) {
         var tmp = str[i].split('=');
         obj[tmp[0].replace(/ /g,'')] = tmp[1];
     }
    return obj;

}
 
// Remove element with key from the cookies
function removeECookie(key) {
    var obj = getCookie();
    var keys = Object.keys(obj);
    var count = 0;
    var newCookie= ""
    keys.forEach(function (k) {
        if (k !== key) {
            if (count > 0) {
                newCookie += ";"
             }
            newCookie += k + "=" + obj[k];
            count++;
        }
        
    });
 
    document.cookie = newCookie;
}

// Add new element to the user's cookies list
function addECookie(key, value) {
    var k = key + "=";
    document.cookie=(k).concat(value);
}