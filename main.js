img="";
status="";
objects=[];
song=""; 
function preload(){
    song = loadSound("alarmloud.mp3");
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stauts").innerHTML = "Status: Detecting object";
}
function draw(){
    image(video,0,0,380,380);
    
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            console.log("working");
            document.getElementById("stauts").innerHTML = "Status: Object Detector";
           

            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            song.play();
            song.setVolume(2.5);
            song.rate(1);
        }else{
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            song.stop();
        }
    }
}
    /*fill("red");
    text("Dog",45,75);
    noFill();
    stroke("red");
    rect(30,60,450,350);

    fill("red")
    text("Cat",320,120);
    noFill();
    stroke("red");
    rect(300,90,270,320)*/
function modelLoaded(){
    console.log("Cocossd is Initiallized");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
        console.log(objects);
    }
}