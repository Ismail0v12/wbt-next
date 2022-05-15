import React from 'react';

function LoadingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
         style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"}} width="100px"
         height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="84" cy="50" r="10" fill="#db9200">
        <animate attributeName="r" repeatCount="indefinite" dur="0.4098360655737705s" calcMode="spline" keyTimes="0;1"
                 values="10;0" keySplines="0 0.5 0.5 1" begin="0s"/>
        <animate attributeName="fill" repeatCount="indefinite" dur="1.639344262295082s" calcMode="discrete"
                 keyTimes="0;0.25;0.5;0.75;1" values="#db9200;#db9200;#db9200;#db9200;#db9200" begin="0s"/>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#db9200">
        <animate attributeName="r" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#db9200">
        <animate attributeName="r" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4098360655737705s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4098360655737705s"/>
      </circle>
      <circle cx="84" cy="50" r="10" fill="#db9200">
        <animate attributeName="r" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.819672131147541s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.819672131147541s"/>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#db9200">
        <animate attributeName="r" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.2295081967213115s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.639344262295082s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.2295081967213115s"/>
      </circle>
    </svg>
  );
}

export default LoadingIcon;