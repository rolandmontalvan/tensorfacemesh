/*
Install dependencies D
Import dependencies D
Setup webcam and canvas D
Define reference to those D
Load facemesh D
Detect function D
Drawing utilities
Load triangulation
SDetup triangle path
Setup point drawing
Add drawMesh to detect function 
*/
import './App.css';
//Import dependencies
import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities"
import { useRef } from 'react';


function App() {
  //Setup webcam and canvas
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      importResolution: { width: 640, height: 480 }, scale: 0.8
    });
    setInterval(() => {
      detect(net)
    }, 200)
  }

  //Detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4) {
      //Get video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;


      //Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      //Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      //Make detections
      const face = await net.estimateFaces(video);
      console.log(face);
      //Get Canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);

    }
  }
  runFacemesh();

  return (
    //Define reference to those
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }
        } />
        <canvas ref={canvasRef} style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }
        } />
      </header>
    </div>
  );
}

export default App;
