prediction1="";
prediction2="";

Webcam.set({
    width: 320,
    height: 300,
    image_format: "png",
    png_quality: 100
})
camera=document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capturedImage' src="+data_uri+">"
    })
}

console.log(ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/W5ynQYXQ1/model.json",modelLoaded)

function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The 1st prediction is "+prediction1
    speak_data_2="And the 2nd prediction is "+prediction2
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterThis)
}

function predictEmotion(){
    img=document.getElementById('capturedImage')
    classifier.classify(img, gotResult)
}

function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        prediction1=result[0].label
        prediction2=result[1].label

        document.getElementById("result_emotion_name").innerHTML=prediction1
        document.getElementById("result_emotion_name2").innerHTML=prediction2

        speak()

        if(prediction1 == "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;"
        }
        if(prediction1 == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;"
        }
        if(prediction1 == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;"
        }

        if(prediction2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;"
        }
        if(prediction2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"
        }
        if(prediction2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
    }
}