// Задача №1. Форматтер чисел

function parseCount(value) {   
    let result = Number.parseInt(value);  
    if (Number.isInteger(result)) {
        return result;
    }
    throw new Error("Невалидное значение"); 
}
function validateCount(value) {
    try {
        return parseCount(value);
    } catch (err) {
        return err;
    }
}


// Задача №2. Треугольник 

class Triangle {
    constructor (a, b, c) {
        if (a + b < c || a + c < b || b + c < a) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getPerimeter() {
        return (this.a + this.b + this.c);
    }
    getArea() {
        return Number.parseFloat(Math.sqrt(this.getPerimeter() * (this.getPerimeter() / 2 - this.a) 
        * (this.getPerimeter() / 2 - this.b) * (this.getPerimeter() / 2 - this.c) / 2).toFixed(3));
    }
}

function getTriangle(a, b ,c) {
    try {
        return new Triangle(a, b ,c);
    } catch (err) {
        return new Object( 
            {
            getPerimeter() {
                return "Ошибка! Треугольник не существует" 
            } ,
            getArea() {
                return "Ошибка! Треугольник не существует"
            }
            } 
        )
    }
}
