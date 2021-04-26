import echo from "../libs/echo"

function lazyImg() {
    echo.init({
        offset: 100,//离可视区域多少像素的图片可以被加载
        throttle: 0 //图片延迟多少毫秒加载
    });
}

//单点登录验证
function safeUser(_this) {
    _this.$store.dispatch("user/safeUser", {
        success: (res) => {
            if (res.code !== 200) {
                _this.$router.replace('/login');
            }
        }
    });
}

export default ({
    lazyImg,
    safeUser
})