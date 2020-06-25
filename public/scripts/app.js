'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("App.js is running");

var appRoot = document.getElementById('app');

var app = {
    title: 'My Little Bonfire',
    subtitle: 'Stoke yer fire.',
    options: [],
    wood: 0,
    food: 0,
    water: 0,
    meat: 0
};

// const onFormSubmit = (e) => {
//     e.preventDefault(); //Prevent page refresh

//     const option = e.target.elements.option.value;

//     if(option){
//         app.options.push(option);
//         e.target.elements.option.value = '';
//     }
//     renderApp();
//     console.log('Form Submitted');
// };


// const StokeFire = () => {
//     {app.wood > 0 ? app.wood-- : console.log("not enough wood..") } ;
//     console.log("stoked the flame..")
//     renderApp();
// }


// const EatFood = () => {
//     {app.food > 0 ? app.food-- : console.log("not enough food..") } ;
//     renderApp();
// }


// const DrinkWater = () => {
//     {app.water > 0 ? app.water-- : console.log("not enough water..") } ;
//     renderApp();
// }


// const CollectWood = () => {
//     app.wood++;
//     console.log("collected wood: {app.wood}")
//     renderApp();
// }


// const HuntSmallAnimals = () => {
//     app.meat++;
//     console.log("Found some animals..")
//     renderApp();
// }

// const CookFood = () => {
//     {app.meat > 0 ? app.meat-- && app.food++ : console.log("not enough meat..") } ;
//     renderApp();
// }

// const CollectWater = () => {
//     app.water++;
//     renderApp();
// }

var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        console.log('hit Test component');
        _this.state = {
            title: 'My Little Bonfire',
            subtitle: 'Stoke yer fire.',
            options: [],
            wood: 0,
            food: 0,
            water: 0,
            meat: 0,
            history: [''],
            availability: {
                cook: true,
                drink: true,
                eat: true,
                stoke: true,
                collectWater: false,
                collectWood: false,
                collectFood: false
            }
        };
        return _this;
    } // Test

    _createClass(Test, [{
        key: 'stokeFire',
        value: function stokeFire() {
            this.consumeObject('wood', 'stoke', 'stoked the flame..', 'not enough wood..');
        }
    }, {
        key: 'eatFood',
        value: function eatFood() {
            this.consumeObject('food', 'eat', 'Ate some... animal.. meat', 'Not enough food..');
        }
    }, {
        key: 'consumeObject',
        value: function consumeObject(thisObject, availibility, message, failedMessage, successCallback) {
            var oldObject = this.state[thisObject];
            if (oldObject > 0) {
                this.setState(function (prevState) {
                    return _defineProperty({}, thisObject, prevState[thisObject] - 1);
                });
                this.setState(function (prevState) {
                    return { history: [message].concat(_toConsumableArray(prevState.history)) };
                });;

                if (successCallback) successCallback();
            } else {
                if (failedMessage) {
                    this.setState(function (prevState) {
                        return { history: [failedMessage].concat(_toConsumableArray(prevState.history)) };
                    });;
                }
            }

            if (oldObject - 1 <= 0) {
                // Set drink to unavailable
                var newAvailability = this.state.availability;
                newAvailability[availibility] = true;
                this.setState({ availability: newAvailability });
            }
        }
    }, {
        key: 'updateAvailability',
        value: function updateAvailability(availabilityType, value) {
            var newAvailability = this.state.availability;
            newAvailability[availabilityType] = value;
            this.setState({ availability: newAvailability });
        }
    }, {
        key: 'actionTimeout',
        value: function actionTimeout(action, timeout) {
            var _this2 = this;

            this.updateAvailability(action, true);
            setTimeout(function () {
                _this2.updateAvailability(action, false);
            }, timeout);
        }
    }, {
        key: 'drinkWater',
        value: function drinkWater() {
            this.consumeObject('water', 'drink', 'Drank some water. Mmm, refreshing..');
        }
    }, {
        key: 'collectWood',
        value: function collectWood() {
            var _this3 = this;

            this.actionTimeout('collectWood', 1000);
            if (this.state.wood <= 0) this.updateAvailability('stoke', false);
            this.setState(function (prevState) {
                return { wood: prevState.wood + 1 };
            });
            this.setState(function (prevState) {
                return { history: ['collected wood: ' + _this3.state.wood].concat(_toConsumableArray(prevState.history)) };
            });
        }
    }, {
        key: 'huntSmallAnimals',
        value: function huntSmallAnimals() {
            var _this4 = this;

            this.actionTimeout('collectFood', 1000);
            if (this.state.food <= 0) this.updateAvailability('cook', false);
            this.setState(function (prevState) {
                return { meat: _this4.state.meat + 1 };
            });
            this.setState(function (prevState) {
                return { history: ["Found some... animal.. meat"].concat(_toConsumableArray(prevState.history)) };
            });;
        }
    }, {
        key: 'cookFood',
        value: function cookFood() {
            var _this5 = this;

            this.actionTimeout('cook', 3000);
            this.consumeObject('meat', 'cook', 'Cooked some fiiine food..', 'Not enough meat', function () {
                _this5.setState(function (prevState) {
                    return { food: prevState.food + 1 };
                });
                //update eat availability
                _this5.updateAvailability('eat', false);
            });
        }
    }, {
        key: 'collectWater',
        value: function collectWater() {
            var _this6 = this;

            this.actionTimeout('collectWater', 1000);
            if (this.state.water <= 0) this.updateAvailability('drink', false);
            this.setState(function (prevState) {
                return { water: prevState.water + 1 };
            });
            this.setState(function (prevState) {
                return { history: ['collected water: ' + _this6.state.water].concat(_toConsumableArray(prevState.history)) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'flex-title' },
                    React.createElement(
                        'h1',
                        null,
                        this.state.title
                    ),
                    this.state.subtitle && React.createElement(
                        'p',
                        null,
                        this.state.subtitle
                    ),
                    React.createElement('img', { className: 'headerImage', src: '/res/pixel-fire.gif', alt: 'Bonfire' })
                ),
                React.createElement(
                    'div',
                    { className: 'centered-row resource-row' },
                    React.createElement(
                        'p',
                        null,
                        'Wood: ',
                        this.state.wood
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Meat: ',
                        this.state.meat
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Food: ',
                        this.state.food
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Water: ',
                        this.state.water
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'centered-row' },
                    React.createElement(
                        'div',
                        { className: 'column-buttons' },
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.collectFood, onClick: function onClick() {
                                    return _this7.huntSmallAnimals();
                                } },
                            'Hunt'
                        ),
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.cook, onClick: function onClick() {
                                    return _this7.cookFood();
                                } },
                            'Cook'
                        ),
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.collectWater, onClick: function onClick() {
                                    return _this7.collectWater();
                                } },
                            'Collect Water'
                        ),
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.eat, onClick: function onClick() {
                                    return _this7.eatFood();
                                } },
                            'Eat'
                        ),
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.drink, onClick: function onClick() {
                                    return _this7.drinkWater();
                                } },
                            'Drink'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'column-buttons' },
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.stoke, onClick: function onClick() {
                                    return _this7.stokeFire();
                                } },
                            'Stoke Bonfire'
                        ),
                        React.createElement(
                            'button',
                            { disabled: this.state.availability.collectWood, onClick: function onClick() {
                                    return _this7.collectWood();
                                } },
                            'Collect Tinder'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'historyDisplay' },
                    this.state.history.slice(0, 7).map(function (el, idx) {
                        return React.createElement(
                            'p',
                            { key: idx },
                            el
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { 'class': 'darkRoomLink' },
                    React.createElement(
                        'a',
                        { href: 'http://adarkroom.doublespeakgames.com/', target: '_blank' },
                        'Check out A Dark Room!'
                    )
                )
            );
        }
    }]);

    return Test;
}(React.Component);

// const renderApp = () => {
//     const template = ( 
//         <div>
//             <div className="flex-title">
//                 <h1>{app.title}</h1>
//                 {(app.subtitle) && <p>{app.subtitle}</p>}
//                 <img className="headerImage" src="/res/pixel-fire.gif" alt="Bonfire"/>
//             </div>

//             <a href="http://adarkroom.doublespeakgames.com/" target="_blank">Check out A Dark Room!</a>
//             <p>Wood: {app.wood}</p>

//             <div className="consumable-row centered-row">
//                 <p>Meat: {app.meat}</p>
//                 <p>Food: {app.food}</p>
//                 <p>Water: {app.water}</p>
//             </div>
//             <button onClick={StokeFire}>Stoke Bonfire</button>
//             <button onClick={CollectWood}>Collect Tinder</button>   


//             <div>
//                 <button onClick={HuntSmallAnimals}>Hunt</button>  
//                 <button onClick={CookFood}>Cook</button>  
//                 <button onClick={CollectWater}>Collect Water</button>  
//             </div>

//             <div>
//                 <button onClick={EatFood}>Eat</button>
//                 <button onClick={DrinkWater}>Drink</button>   
//             </div>                    


//             <div>
//                 <label htmlFor="occurrences">Whats going on?</label>

//                 <textarea id="occurrences" name="occurrencesText" rows="4" cols="50" defaultValue="You wakeup near a calm spring..."/>
//             </div>

//             {/* <div>
//                 <p>{this.state.info}</p>
//             </div> */}

//         </div>        


//     );

//    ReactDOM.render(template, appRoot);
// };
//renderApp();


console.log('before ReactDOM render');
ReactDOM.render(React.createElement(Test, null), appRoot); //
