# Домашнее задание к лекции 4 «Объекты»

### Задача 1. Инкапсуляция студента
Мы хотим инкапсулировать логику работы со студентами в объекты таким образом, чтобы мы могли создавать студентов, устанавливать им предмет, добавлять оценки, считать средний балл и отчислять.

Для этого:
1. Создайте функцию конструктор `Student(name, gender, age)` и с помощью оператора `new` несколько экземпляров объектов (студентов). 

function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

2. Создайте доступный для всех экземпляров `student` метод `setSubject(subjectName)`, который при вызове будет устанавливать поле предмет `subject` экземпляра в `subjectName`. Для этого добавьте в свойство `Student.prototype` функции конструктора функцию `setSubject`.
```js

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}
```

3. Создайте метод `addMark(mark)` по аналогии с п.2, который при вызове будет добавлять студенту оценку `mark` в свойство (массив) `marks` объекта. Обратите внимание, что ранее мы нигде не задавали свойство marks для инстансов(экземпляров). Значит нам надо проверять, что свойство существует. Сделать это в методе можно следующим образом:
```js

Student.prototype.addMark = function (mark) {
  if(this.marks === undefined){ 
    this.marks = [mark];
    } else {
      this.marks.push(mark);
    }
}
```

4. Создайте метод `addMarks(mark1,mark2,mark3...)` по аналогии с п.2, который при вызове будет добавлять студенту сразу несколько оценок. 
Подсказка: так как количество добавляемых оценок неизвестно, воспользуйтесь rest параметром.

Student.prototype.addMarks = function (...args) {
  if(this.marks === undefined){ 
    this.marks = [...args];
    } else {
      this.marks.push(...args);
    }
}

5. Создайте метод `getAverage()` по аналогии с п.2, который при вызове будет возвращать среднее арифметическое оценок студента.

Student.prototype.getAverage = function () {
  if(this.marks === undefined){ 
    return "У студента нет оценок";
    }
    let sum =0;
    for (let mark of this.marks) {
      sum = sum + mark;
    }
    return sum/this.marks.length;  
}

6. Создайте метод `exclude(reason)` по аналогии с п.2, который при вызове будет исключать студента из учебного процесса и устанавливать причину исключения. Для этого надо удалить свойства `subject` и `marks` и добавить свойство `excluded` со значением `reason`.

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
}

### Пример:
```js
let student1 = new Student("Tony", "male", 37);
student1.setSubject("Algebra");
student1.addMark(5);
student1.addMark(4);
student1.addMark(5);
console.log(student1.getAverage()); // 4.666666666666667
console.log(student1);
// {age: 37, gender: "male", marks: [5, 4, 5], name: "Tony", subject: "Algebra"}
let student2 = new Student("Buzz", "female", 35);
student2.setSubject("Geometry");
student2.addMark(2);
student2.addMark(3);
student2.addMark(2);
student2.exclude('low grades')
console.log(student2)
// {name: "Buzz", gender: "female", age: 35, excluded: "low grades"}
```

## Решение задач

1. Произведите [Fork](https://ru.wikipedia.org/wiki/Форк) репозитория с задачами (fork необходимо делать перед выполнением каждой домашней работы).
2. Перейти в папку задания. `cd ./4.objects`.
3. Откройте файл `task.js` в вашем редакторе кода и выполнить задание.
4. Самостоятельно вызывать функции не требуется, если это не требуется по заданию.
5. Откройте файл `index.html` в вашем браузере и с помощью консоли DevTools убедиться в правильности выводимых результатов.
6. Откройте файл `test-runer.html` в вашем браузере и убедитесь, что все тесты выполняются (на вкладке Spec List можно видеть какие тесты выполнились, а какие нет)
7. Добавить файл `task.js` в индекс git с помощью команды `git add %file-path%`, где %file-path% - путь до целевого файла. `git add task.js`.
8. Сделать коммит используя команду `git commit -m '%comment%'`, где %comment% - это произвольный комментарий к вашему коммиту. `git commit -m 'first commit variables'`.
9. Опубликовать код в репозиторий homeworks с помощью команды `git push -u origin main`.
10. Прислать ссылку на репозиторий через личный кабинет на сайте [Нетологии][6].

[0]: https://github.com/
[1]: https://www.sublimetext.com/
[2]: https://code.visualstudio.com/
[3]: https://github.com/netology-code/guides/blob/master/git/github.md
[4]: https://git-scm.com/
[5]: https://github.com/netology-code/guides/blob/master/git/README.md
[6]: https://netology.ru/

_Никаких файлов прикреплять не нужно._

Любые вопросы по решению задач задавайте в чате учебной группы.
