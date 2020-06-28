'use strict';

console.log("App.js is running");

const appRoot = document.getElementById('app');

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

class Test extends React.Component{
    constructor(props){
        super(props);
        console.log('hit Test component')
        this.state = {
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
        }
    } // Test

    stokeFire(){
        this.consumeObject('wood', 'stoke', 'stoked the flame..', 'not enough wood..');
    }
    
    eatFood(){
       this.consumeObject('food', 'eat', 'Ate some... animal.. meat', 'Not enough food..');
    }

    consumeObject(thisObject, availibility, message, failedMessage, successCallback){
        let oldObject = this.state[thisObject];
        if(oldObject > 0){
            this.setState(prevState => ({[thisObject]: prevState[thisObject] - 1}))
            this.setState(prevState => ({history: [message, ...prevState.history,]}));;

            if(successCallback) successCallback();
        } else{
            if(failedMessage){
                this.setState(prevState => ({history: [failedMessage, ...prevState.history]}));;
            }
        }

        if(oldObject - 1 <= 0){
             // Set drink to unavailable
             let newAvailability = this.state.availability;
             newAvailability[availibility] = true;
             this.setState({availability: newAvailability})
        }
    }

    updateAvailability(availabilityType, value){
        let newAvailability = this.state.availability;
        newAvailability[availabilityType] = value;
        this.setState({availability: newAvailability});
    }

    actionTimeout(action, timeout){
        this.updateAvailability(action, true);
        setTimeout(()=> {
            this.updateAvailability(action, false);
        }, timeout)
    }
    
    drinkWater(){
        this.consumeObject('water', 'drink', 'Drank some water. Mmm, refreshing..');
    }
    
    collectWood(){
        this.actionTimeout('collectWood', 1000);
        if(this.state.wood <= 0) this.updateAvailability('stoke', false);
        this.setState(prevState => ({wood: prevState.wood + 1}));
        this.setState(prevState => ({history: [`collected wood: ${this.state.wood}`, ...prevState.history, ]}));
    }
    
    huntSmallAnimals(){
        this.actionTimeout('collectFood', 1000);
        if(this.state.food <= 0) this.updateAvailability('cook', false);
        this.setState(prevState => ({meat: this.state.meat + 1}));
        this.setState(prevState => ({history: ["Found some... animal.. meat", ...prevState.history, ]}));;
    }
    
    cookFood() {
        this.actionTimeout('cook', 3000);
        this.consumeObject('meat', 'cook', 'Cooked some fiiine food..', 'Not enough meat', () => {
            this.setState(prevState => ({food: prevState.food + 1}));
            //update eat availability
            this.updateAvailability('eat', false);
        });
    }
    
    collectWater(){
        this.actionTimeout('collectWater', 1000);
        if(this.state.water <= 0) this.updateAvailability('drink', false);
        this.setState(prevState => ({water: prevState.water + 1}));
        this.setState(prevState => ({history: [`collected water: ${this.state.water}`, ...prevState.history, ]}));        
    }

    render(){
        return(
            <div>
                <div className="flex-title">
                    <h1>{this.state.title}</h1>
                    {(this.state.subtitle) && <p>{this.state.subtitle}</p>}
                    <img className="headerImage" src="/res/pixel-fire.gif" alt="Bonfire"/>                                    

                </div>
                

                <div className="centered-row resource-row">
                    <p>Wood: {this.state.wood}</p>
                    <p>Meat: {this.state.meat}</p>
                    <p>Food: {this.state.food}</p>
                    <p>Water: {this.state.water}</p>
                </div>


            <div className="tab">
                <button className="tablinks" onClick={() => this.openTab(event, 'resources')}>Resource Collection</button>
                <button className="tablinks" onClick={() => this.openTab(event, "adventure")}>Adventure</button>
            </div>


                <div id="resources" className="tabcontent">
                    <div className="centered-row">                    
                        <div className = "column-buttons">                        
                            <button disabled={this.state.availability.eat} onClick={() => this.eatFood()}>Eat</button>
                            <button disabled={this.state.availability.drink} onClick={() => this.drinkWater()}>Drink</button>  
                            {/* <button disabled={this.state.availability.drink} onClick={() => this.consumeObject('water', 'drink', 'Drank some water. Mmm, refreshing..')}>Drink</button>   */}
                        </div>
                        <div className = "column-buttons">
                            <button disabled={this.state.availability.collectFood} onClick={() => this.huntSmallAnimals()}>Hunt</button>  
                            <button disabled={this.state.availability.cook} onClick={() => this.cookFood()}>Cook</button>  
                            <button disabled={this.state.availability.collectWater} onClick={() => this.collectWater()}>Collect Water</button>  
                        </div>
                    
                        <div className = "column-buttons">
                            <button disabled={this.state.availability.stoke} onClick={() => this.stokeFire()}>Stoke Bonfire</button>
                            <button disabled={this.state.availability.collectWood} onClick={ () => this.collectWood()}>Collect Tinder</button>   
                        </div>    
                    </div>
                </div>

                <div id="adventure" className="tabcontent">
                    <h1>adventure</h1>
                </div>
                                   
                <div className="historyDisplay">
                    {/* <label htmlFor="occurrences">Whats going on?</label> */}
                    
                    {/* <textarea id="occurrences" name="occurrencesText" rows="4" cols="50" defaultValue="You wakeup near a calm spring..."/> */}
                    {/* {this.state.history[this.state.history.length - 1]} f*/}
                    {this.state.history.slice(0, 7).map((el,idx) => {
                        return <p key={idx}>{el}</p>
                    })}
                </div>

                <div className="darkRoomLink">
                    <a href="http://adarkroom.doublespeakgames.com/" target="_blank">Check out A Dark Room!</a>
                </div>
            </div>  
        );
    }


    openTab(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
      }


}

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
ReactDOM.render(<Test />, appRoot);//