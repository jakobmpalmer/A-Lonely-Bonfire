'use strict';

console.log("App.js is running");

var app = {
    title: 'My Little Bonfire',
    subtitle: 'Stoke that fire.',
    options: [],
    wood: 0,
    food: 0,
    water: 0,
    meat: 0
};

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault(); //Prevent page refresh

    var option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
    }
    renderApp();
    console.log('Form Submitted');
};

var StokeFire = function StokeFire() {
    {
        app.wood > 0 ? app.wood-- : console.log("not enough wood..");
    };
    console.log("stoked the flame..");
    renderApp();
};

var EatFood = function EatFood() {
    {
        app.food > 0 ? app.food-- : console.log("not enough food..");
    };
    renderApp();
};

var DrinkWater = function DrinkWater() {
    {
        app.water > 0 ? app.water-- : console.log("not enough water..");
    };
    renderApp();
};

var CollectWood = function CollectWood() {
    app.wood++;
    console.log("collected wood: {app.wood}");
    renderApp();
};

var HuntSmallAnimals = function HuntSmallAnimals() {
    app.meat++;
    console.log("Found some animals..");
    renderApp();
};

var CookFood = function CookFood() {
    {
        app.meat > 0 ? app.meat-- && app.food++ : console.log("not enough meat..");
    };
    renderApp();
};

var CollectWater = function CollectWater() {
    app.water++;
    renderApp();
};

var appRoot = document.getElementById('app');

var renderApp = function renderApp() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'flex-title' },
            React.createElement(
                'h1',
                null,
                app.title
            ),
            app.subtitle && React.createElement(
                'p',
                null,
                app.subtitle
            ),
            React.createElement('img', { className: 'headerImage', src: '/res/pixel-fire.gif', alt: 'Bonfire' })
        ),
        React.createElement(
            'a',
            { href: 'http://adarkroom.doublespeakgames.com/', target: '_blank' },
            'Check out A Dark Room!'
        ),
        React.createElement(
            'p',
            null,
            'Wood: ',
            app.wood
        ),
        React.createElement(
            'div',
            { className: 'consumable-row' },
            React.createElement(
                'p',
                null,
                'Meat: ',
                app.meat
            ),
            React.createElement(
                'p',
                null,
                'Food: ',
                app.food
            ),
            React.createElement(
                'p',
                null,
                'Water: ',
                app.water
            )
        ),
        React.createElement(
            'button',
            { onClick: StokeFire },
            'Stoke Bonfire'
        ),
        React.createElement(
            'button',
            { onClick: CollectWood },
            'Collect Tinder'
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { onClick: HuntSmallAnimals },
                'Hunt'
            ),
            React.createElement(
                'button',
                { onClick: CookFood },
                'Cook'
            ),
            React.createElement(
                'button',
                { onClick: CollectWater },
                'Collect Water'
            )
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { onClick: EatFood },
                'Eat'
            ),
            React.createElement(
                'button',
                { onClick: DrinkWater },
                'Drink'
            )
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'label',
                { htmlFor: 'occurrences' },
                'Whats going on?'
            ),
            React.createElement('textarea', { id: 'occurrences', name: 'occurrencesText', rows: '4', cols: '50', defaultValue: 'You wakeup near a calm spring...' })
        )
    );

    ReactDOM.render(template, appRoot);
};

renderApp();
