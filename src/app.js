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

const onFormSubmit = (e) => {
    e.preventDefault(); //Prevent page refresh

    const option = e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
    }
    renderApp();
    console.log('Form Submitted');
};



const StokeFire = () => {
    {app.wood > 0 ? app.wood-- : console.log("not enough wood..") } ;
    console.log("stoked the flame..")
    renderApp();
}


const EatFood = () => {
    {app.food > 0 ? app.food-- : console.log("not enough food..") } ;
    renderApp();
}


const DrinkWater = () => {
    {app.water > 0 ? app.water-- : console.log("not enough water..") } ;
    renderApp();
}


const CollectWood = () => {
    app.wood++;
    console.log("collected wood: {app.wood}")
    renderApp();
}


const HuntSmallAnimals = () => {
    app.meat++;
    console.log("Found some animals..")
    renderApp();
}

const CookFood = () => {
    {app.meat > 0 ? app.meat-- && app.food++ : console.log("not enough meat..") } ;
    renderApp();
}

const CollectWater = () => {
    app.water++;
    renderApp();
}


const appRoot = document.getElementById('app');

const renderApp = () => {
    const template = (
        <div>
            <div className="flex-title">
                <h1>{app.title}</h1>
                {(app.subtitle) && <p>{app.subtitle}</p>}
                <img className="headerImage" src="/res/pixel-fire.gif" alt="Bonfire"/>
            </div>

            <a href="http://adarkroom.doublespeakgames.com/" target="_blank">Check out A Dark Room!</a>
            <p>Wood: {app.wood}</p>

            <div className="consumable-row">
                <p>Meat: {app.meat}</p>
                <p>Food: {app.food}</p>
                <p>Water: {app.water}</p>
            </div>
            <button onClick={StokeFire}>Stoke Bonfire</button>
            <button onClick={CollectWood}>Collect Tinder</button>   
            


            <div>
                <button onClick={HuntSmallAnimals}>Hunt</button>  
                <button onClick={CookFood}>Cook</button>  
                <button onClick={CollectWater}>Collect Water</button>  
            </div>

            <div>
                <button onClick={EatFood}>Eat</button>
                <button onClick={DrinkWater}>Drink</button>   
            </div>                    


            <div>
                <label htmlFor="occurrences">Whats going on?</label>
                
                <textarea id="occurrences" name="occurrencesText" rows="4" cols="50" defaultValue="You wakeup near a calm spring..."/>
            </div>

            {/* <div>
                <p>{this.state.info}</p>
            </div> */}

        </div>        
        
        
    );
    
    ReactDOM.render(template, appRoot);
};

renderApp();