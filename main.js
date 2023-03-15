objects = [];
status="";


function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video =createCapture(VIDEO);
    video.size(150,150);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
   
   
      
    
    }
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name =document.getElementById("object_name").value ;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}

function draw(){
    image(video ,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video,gotResult);
        for(i = 0 ;i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="status : object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are:"+objects.length;

            fill("blue");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+ percent +"%" ,objects[i].x +15 , objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
        if( objects[i].label == object_name) 
        {
           
           video.stop();
           objectDetector.detect(gotResult);
           document.getElementById("status").innerHTML= " object Found";
synth = window.speechSynthesis;
utterThis = new SpeechSynthesisUtterance(object_name +"Found");
synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML= " Object not found" ;  
        }
    }
}
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


