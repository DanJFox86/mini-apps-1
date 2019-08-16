var topRow = (props) => (
  <div>
    <div className={"spot " + props.spaces[0]} id="0" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[1]} id="1" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[2]} id="2" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[3]} id="3" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[4]} id="4" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[5]} id="5" onClick={props.onclick}></div>
    <div className={"spot " + props.spaces[6]} id="6" onClick={props.onclick}></div>
  </div>
);

export default topRow;