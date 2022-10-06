function cachingDecoratorNew(func) {
  let cache = []; 
  function wrapper(...args) {
      const hash = args.join(','); // получаем правильный хэш
      let objectInCache = cache.find((item) => hash === Object.keys(item)[0]);// Object.keys(item)[0]); // ищем элемент, хэш которого равен нашему хэшу
      if (objectInCache ) { // если элемент найден
          console.log("Из кэша: " + Object.values(objectInCache)[0]); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
          return "Из кэша: " + Object.values(objectInCache)[0];
      }
  
      let result = func(...args); // в кэше результата нет - придётся считать
      cache.push({[hash]:result}); // добавляем элемент с правильной структурой
      console.log(cache);
      if (cache.length > 5) { 
        cache.shift(); // если слишком много элементов в кэше надо удалить самый старый (первый) 
      }
      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;  
  }
  console.log(cache);
  return wrapper;
  }


function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let count = 0;
  let allCount = 0;
  return function wrapper(...args) {
    if (timeoutId !== null && typeof(timeoutId) !== "undefined") {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      console.log(func(...args));
      count++
      wrapper.count = count;
    }, delay);
    allCount++;
    wrapper.allCount = allCount;
  }
}

const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(() => upgradedSendSignal(1, 0)); // Сигнал отправлен + будет запланирован асинхронный запуск, который будет проигнорирован так как следующий сигнал отменит предыдущий (300 - 0 < 2000)
setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано так как следующий сигнал отменит предыдущий (900 - 300 < 2000)
setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано так как следующий сигнал отменит предыдущий (1200 - 900 < 2000)
setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано так как следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен так как следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано так как следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
setTimeout(() => {
  console.log(`было выполнено ${upgradedSendSignal.count} отправки сигнала`); // было выполнено 3 отправки сигнала
  console.log(`было выполнено ${upgradedSendSignal.allCount} вызовов декорированной функции`); // было выполнено 6 вызовов декорированной функции
}, 7000)