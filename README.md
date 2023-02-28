# IdleTimer

Classe criada em Javascript para validar o tempo ocioso do site e disparar ação personalizada.


#Exemplo:

const Timer = new idleTimer({
  timeOutInSeconds: 30,
  clearCookie: true,
  onTimeout(){
    alert("Sua sessão foi encerrada por inatividade!");
  },
  onExpired(){
    alert("Timer expirado");
  }
});

# Se quiser tambem pode limpar o time manualmente

#Exemplo: 

Timer.cleanUp();// apos chamado o methodo é realizado uma limpeza no timer e gerado um refresh na pagina.


# Se quiser limpar todos os cookies salvos no navegador.

Timer.cleanCookies();


# Created by Douglas S. Santos
