import React, { useState, useRef, useEffect } from "react";
import "./AirDrawing.css";
import "./MultiGameCanvas.css";

function MultiGameCanvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const CANVAS_WIDTH = 640,
    CANVAS_HEIGHT = 480;

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    setCtx(context);
  }, []);

  useEffect(() => {
    props.socket.on("clear canvas", () => {
      clearCanvas();
    });

    props.socket.on("receive data", (data) => {
      if (ctx) {
        if (data[0]) {
          // 그리는 상태 일 때
          ctx.lineTo(data[1], data[2]); // 현재의 드로잉 위치에서 x와 y로 지정된 위치까지 선을 그립니다.
          ctx.stroke(); // 윤곽선을 이용하여 도형을 그립니다.
        } else {
          ctx.beginPath(); // 새로운 경로를 만들기
          ctx.moveTo(data[1], data[2]); // 펜을 x와 y 로 지정된 좌표로 옮깁니다.
        }
      }
    });
  }, [ctx]);

  useEffect(() => {
    if (isDrawing) {
      document.querySelector("#multi-canvas").style.border = "5px solid red";
    } else {
      document.querySelector("#multi-canvas").style.border = "5px solid blue";
    }
    return () => {};
  }, [isDrawing]);

  useEffect(() => {
    let x = 640 - props.pos[0];
    let y = props.pos[1];

    if (ctx && props.socket.id === props.drawer.socketId) {
      props.socket.emit("send data", [isDrawing, x, y]);
    }

    return () => {};
  }, [props.pos, isDrawing, ctx]);

  useEffect(() => {
    clearCanvas();
  }, [props.drawer]);

  const clearCanvas = () => {
    // 서버로 부터 clear 명령을 받을 때 실행
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const sendClear = () => {
    props.socket.emit("clear canvas");
  };

  const startDrawing = (e) => {
    if (e.keyCode === 68 && !isDrawing) {
      setIsDrawing(true);
    }
  };

  const finishDrawing = (e) => {
    if (e.keyCode === 68) {
      setIsDrawing(false);
    }
  };

  return (
    <div className="form-canvas">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        id="multi-canvas"
        tabIndex="0"
        onKeyDown={startDrawing}
        onKeyUp={finishDrawing}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <br />
      {props.drawer.nickname === props.nickname ? (
        <button className="btn-reset" onClick={sendClear}>
          초기화
        </button>
      ) : null}
    </div>
  );
}

export default MultiGameCanvas;
