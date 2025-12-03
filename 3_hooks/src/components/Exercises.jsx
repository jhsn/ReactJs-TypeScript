/*
  Exercicio 1 : Uso do useEffect para sincronizar dados
    Voce precisa exibir informações de um usuario que são recebidas 
    via props em um componente.
    Crie um componente quye use hook useeffect para sincronizar as 
    informações di usuario como o titulo de documento (Aba do Navegador)
  Exercicio 2 : Memorizando calculo com useMemo
    Suponha qu voce tenha um componente que realize cálculos pesados, como uma função
    de fibonacci que é chamada com um numero especifico
    use o hook useMemo para que o calculo seja refeito desnecessariamente
  Exercicio 3 : Criação e uso de um custom hook
    Crie um custom hook chamado useOnlineStatus que rastreia se o usuario
    esta online ou offline, use este hook em um componente para exibir o 
    status atualo do usuario  
*/

import React, { useState, useEffect, useMemo } from "react";

// Solução do Exercício 1: Uso de useEffect para Sincronização de Dados
const UserInfo = ({ userInfo }) => {
  useEffect(() => {
    document.title = `${userInfo.name} - ${userInfo.jobTitle}`;
  }, [userInfo]);

  return (
    <div>
      <h1>{userInfo.name}</h1>
      <p>{userInfo.jobTitle}</p>
    </div>
  );
};

// Solução do Exercício 2: Memorizando Cálculos com useMemo
const fibonacci = (n) => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const FibCalculator = ({ num }) => {
  const fibResult = useMemo(() => fibonacci(num), [num]);

  return (
    <div>
      <p>
        Fibonacci de {num} é {fibResult}
      </p>
    </div>
  );
};

// Solução do Exercício 3: Criação e Uso de um Custom Hook
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

const OnlineStatusIndicator = () => {
  const isOnline = useOnlineStatus();

  return (
    <div>
      <p>Você está atualmente: {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
};

// Componente que engloba todas as soluções de exercícios
const Exercises = () => {
  // Mock de props para o UserInfo
  const userInfo = { name: "Jorge", jobTitle: "Desenvolvedor" };

  // Estado para o FibCalculator
  const [num, setNum] = useState(10);

  return (
    <div>
      <h2>Exercício 1: UserInfo</h2>
      <UserInfo userInfo={userInfo} />

      <h2>Exercício 2: FibCalculator</h2>
      <FibCalculator num={num} />

      <h2>Exercício 3: OnlineStatusIndicator</h2>
      <OnlineStatusIndicator />
    </div>
  );
};

export default Exercises;
