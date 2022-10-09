function cachingDecoratorNew(func) {
  let cache = []; 
  function wrapper(...args) {
      const hash = args.join(','); // получаем правильный хэш
      let objectInCache = cache.find((item) => hash in item); // ищем элемент, хэш которого равен нашему хэшу
      if (objectInCache ) { // если элемент найден
          console.log("Из кэша: " + objectInCache[hash]); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
          return "Из кэша: " + objectInCache[hash];
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
  return function wrapper(...args) {
    if (timeoutId === undefined) {
      wrapper.count = 1;
      wrapper.allCount = 0;
      func(...args);
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);      
    }
    timeoutId = setTimeout(() => {
      func(...args);
      wrapper.count++
    }, delay);
    wrapper.allCount++;
  }
}