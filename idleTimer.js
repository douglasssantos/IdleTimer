class IdleTimer {
  #timeInterval = 5000;
  #setTimeOut = 300;
  #fractionInSeconds = 1000;
  #parseRadix = 10
  constructor({ timeOutInSeconds, clearCookie = false, onTimeout, onExpired }) {
    this.timeout = timeOutInSeconds;
    this.onTimeout = onTimeout;
    this.clearCookie = clearCookie;
    const expiredTime = parseInt(sessionStorage.getItem("_expiredTime") || 0, this.#parseRadix);
    if (expiredTime > 0 && expiredTime < Date.now()) {
      onExpired();
      return;
    }
    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }
  startInterval(){
    this.updateExpiredTime();
    this.interval = setInterval(()=> {
      const expiredTime = parseInt(sessionStorage.getItem("_expiredTime") || 0, this.#parseRadix);
      if (expiredTime < Date.now()) {
        console.log("Clean Cookies: ", expiredTime+ ' = '+ Date.now())
        if (this.onTimeout) {
          this.onTimeout();
        }
        this.cleanCookies();
        this.cleanUp();
      }
    }, this.#timeInterval)
  }
  updateExpiredTime() {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      sessionStorage.setItem("_expiredTime", Date.now() + this.timeout * this.#fractionInSeconds);
    }, this.#setTimeOut);
  }

  tracker() {
    window.addEventListener("mousemove", this.eventHandler);
    window.addEventListener("scroll", this.eventHandler);
    window.addEventListener("keydown", this.eventHandler);
  }

  cleanUp() {
    sessionStorage.removeItem("_expiredTime");
    clearInterval(this.interval);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("scroll", this.eventHandler);
    window.removeEventListener("keydown", this.eventHandler);
    window.location.reload();
  }

  cleanCookies(){
    if(this.clearCookie) {
      var cookies = $cookies.keys();
      for (var index in cookies) {
        $cookies.remove(cookies[index]);
      }
    }
  }
}
export default IdleTimer;
