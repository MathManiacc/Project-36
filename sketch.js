var dog, dogImage, happyDog, database, foodS, foodStock, foodObj;
var feed,addFood, feedTime, lastFed;
var database;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(700, 500);
  dog = createSprite(250, 350, 30, 30);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {  
  background(46, 139, 87);
  
  foodObj.display();
  feedTime = database.ref('feedTime');
  feedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255, 0, 0);
  textSize(15);
  if(lastFed > 12){
    text("lastFed: " + lastFed%12 + "PM", 350, 30);
  }
  if(lastFed = 12){
    text("lastFed: 12PM", 350, 30);
  }
  else if (lastFed === 0) {
    text("Last Fed: 12 AM",350,30);
  }
  else{
       text ("LastFed :"+lastFed + "AM", 350, 30);
  }
drawSprites(); 
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime: hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}


