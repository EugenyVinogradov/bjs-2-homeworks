// Задача №1. Печатное издание

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }
    fix() {
      this.state = this.state * 1.5;
    }
    set state(newState) {
        if (newState <= 0) {
            this._state = 0;
            return;
        } else if (newState >= 100) {
            this._state = 100;
            return;
        }
        this._state = newState;
    }
    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author,name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "book";
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author,name, releaseDate, pagesCount) {
        super(author,name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author,name, releaseDate, pagesCount) {
        super(author,name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author,name, releaseDate, pagesCount) {
        super(author,name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

// Задача №2. Библиотека

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }
    findBookBy(type, value) {
        let result = null;
        for (let book of this.books) {
            let a = book[type];
            if (book[type] === value) {
                result = book;
            }
        }
        return result;
    }
    giveBookByName(bookName) {
        let result = this.findBookBy("name", bookName); 
        if (result !== null) {
            this.books = this.books.filter(book => book !== result);
            return result;
        }
        return null;
    }
}

// Задача №3. Журнал успеваемости

class Student {
    constructor(name) {
        this.name = name;
    }
    addMark(mark, subject) {
        if (mark < 1 || mark >5) {
            console.log("Ошибка, оценка должна быть числом от 1 до 5");
            return;
        }
        if (this.subjects === undefined) {
            this.subjects = new Map;
            this.subjects.set(subject, [mark]);
            return;
        }
        if (this.subjects.get(subject) === undefined) {
            this.subjects.set(subject, [mark]);
            return;
        }
        let marks = this.subjects.get(subject);
        marks.push(mark);
        this.subjects.set(subject, marks);
    }
    getAverageBySubject(subject) {
        if (this.subjects === undefined) {
            console.log("У студента нет оценок ни по одному предмету");
            return;
        }
        if (this.subjects.get(subject) === undefined) {
            console.log("Несуществующий предмет");
            return;
        }
        let sum = 0;
        let marks = this.subjects.get(subject);
        for (let mark of marks) {
            sum = sum + mark;
        }   
        // return `Средний балл по предмету ${subject} ${sum / marks.length}`;  
        // Не проходит тест, хотя в задании вывод должен быть такой)
        return sum / marks.length;
    }
    getAverage() {
        if (this.subjects === undefined) {
            console.log("У студента нет оценок ни по одному предмету");
            return;
        }
        let sum = 0;
        let length = 0;
        for (let subject of this.subjects.keys()) {
            sum = sum + this.getAverageBySubject(subject) * this.subjects.get(subject).length;
            length = length + this.subjects.get(subject).length;
        }
        // return `Средний балл по всем предметам ${sum / length}`;  
        // Не проходит тест, хотя в задании вывод должен быть такой)
        return sum / length;
    }
    exclude(reason) {
        delete this.subjects;
        this.excluded = reason;
        return console.log(reason);
    }
  }
