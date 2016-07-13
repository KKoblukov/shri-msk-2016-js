// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        // this.popup.querySelector('.door-riddle__button_1'),
        // this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function (b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function (b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё

    var keys = [
        this.popup.querySelector('.door-riddle__key_yellow'),
        this.popup.querySelector('.door-riddle__key_green'),
    ];

    keys.forEach(function (k) {
        k.addEventListener('pointerdown', _onKeyPointerDown.bind(this));
        k.addEventListener('pointermove', _onKeyPointerMove.bind(this));
        k.addEventListener('pointerup', _onKeyPointerUp.bind(this));
        k.addEventListener('pointercancel', _onKeyPointerUp.bind(this));
        k.addEventListener('pointerleave', _onKeyPointerUp.bind(this));
    }.bind(this));

    function _onKeyPointerDown(e) {
        e.target.setPointerCapture(e.pointerId);
        e.target.classList.add('door-riddle__key_pressed');
        moveAt(e);
    }

    function _onKeyPointerMove(e) {
        moveAt(e);
    }

    function moveAt(e) {
        if (e.target.classList.contains('door-riddle__key_pressed')) {
            e.target.style.left = e.pageX - e.target.offsetWidth / 2 + 'px';
            e.target.style.top = e.pageY - e.target.offsetHeight / 2 + 'px';
        }
    }

    function _onKeyPointerUp(e) {
        if (e.target.classList.contains('door-riddle__key_pressed')) {
            e.target.classList.remove('door-riddle__key_pressed');
        }

        if (doElsCollide(greenKey, greenLock, 1, 1) === true) {
            greenKey.classList.add('door-riddle__key_unlocked');
            greenLock.style.display = 'none';
        }

        if (doElsCollide(yellowKey, yellowLock, 1, 1) === true) {
            yellowKey.classList.add('door-riddle__key_unlocked');
            yellowLock.style.display = 'none';
        }
        checkCondition.apply(this);
    }

    doElsCollide = function (el1, el2, c1, c2) {
        var bodyRect = document.body.getBoundingClientRect();
        var elemRect1 = el1.getBoundingClientRect();
        var elemRect2 = el2.getBoundingClientRect();
        el1.offsetBottom = elemRect1.top - bodyRect.top + c1 * el1.offsetHeight;
        el1.offsetRight = elemRect1.left - bodyRect.left + c1 * el1.offsetWidth;
        el2.offsetBottom = elemRect2.top - bodyRect.top + c2 * el2.offsetHeight;
        el2.offsetRight = elemRect2.left - bodyRect.left + c2 * el2.offsetWidth;

        return !((el1.offsetBottom < elemRect2.top - bodyRect.top) ||
                 (elemRect1.top - bodyRect.top > el2.offsetBottom) ||
                 (el1.offsetRight < elemRect2.left - bodyRect.left) ||
                 (elemRect1.left - bodyRect.left > el2.offsetRight));
    };

    var greenKey = document.querySelector('.door-riddle__key_green');
    var greenLock = document.querySelector('.door-riddle__lock_green');
    var yellowKey = document.querySelector('.door-riddle__key_yellow');
    var yellowLock = document.querySelector('.door-riddle__lock_yellow');

    function checkCondition() {
        var isOpened = true;
        keys.forEach(function (k) {
            if (!k.classList.contains('door-riddle__key_unlocked')) {
                isOpened = false;
            }
        });

        if (isOpened) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}

Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function () {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var eyes = [
        this.popup.querySelector('.boss-riddle__eye'),
        this.popup.querySelector('.boss-riddle__eye'),
    ];

    eyes.forEach(function (b) {
        b.addEventListener('pointerdown', _onEyePointerDown.bind(this));
        b.addEventListener('pointerup', _onEyePointerUp.bind(this));
        b.addEventListener('pointercancel', _onEyePointerUp.bind(this));
        b.addEventListener('pointerleave', _onEyePointerUp.bind(this));
    }.bind(this));

    function _onEyePointerDown(e) {
        e.target.classList.add('boss-riddle__eye_pressed');
        checkCondition.apply(this);
    }

    function _onEyePointerUp(e) {
        e.target.classList.remove('boss-riddle__eye_pressed');
    }

    function checkCondition() {
        var isOpened = true;
        eyes.forEach(function (b) {
            if (!b.classList.contains('boss-riddle__eye_pressed')) {
                isOpened = false;
            }
        });

        if (isOpened) {
            this.unlock();
        }
    }

    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function () {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
