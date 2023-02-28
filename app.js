 const Timer = new idleTimer({
                  timeOutInSeconds: 30,
                  clearCookie: true,
                  onTimeout(){
                    alert("Sua sessão foi encerrada por inatividade!")
                  },
                  onExpired(){
                  alert("Timer expirado"); 
                  }
                });
