class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    	this.completed = this.props.completed;
    	
    	this.state = {
      	width: 0,
    		height: 0
    	}
  } 

  render() {
    return (
      <canvas id="progressCanvas" className="progress" />
    );
  }

  componentDidMount() {  
    	this.showCanvas();    
    	this.resizeHandler = this.resizeHandler.bind(this);	
    	window.addEventListener('resize', this.resizeHandler);  
  }

  componentWillUpdate() {   
    this.drawCanvas();
  }
  	
  componentWillUnmount(){
  	window.removeEventListener('resize', this.resizeHandler)
  }
    	
  shouldComponentUpdate(nextProps, nextState){
  	this.completed = nextProps.completed;
  	return nextProps.completed !== this.props.completed;
  }

  resizeHandler() {
    const canvas = document.querySelector('#progressCanvas');
    this.canvasX = canvas.offsetWidth;
    this.canvasY= canvas.offsetHeight;    
    this.setState({
    	width: canvas.offsetWidth,
    	height: canvas.offsetHeight
    });    
    	 	
   	this.drawCanvas();
  }
  
  showCanvas() {
    this.circleDepth = 7;
    this.circleOuterR = 52 - this.circleDepth;
    this.circleInnerR = 45 - this.circleDepth;
    this.circleOuterColor ='#4ca89a';
    this.circleInnerColor ='#96d6f4';     	
    this.drawCanvas(); 
  }

  drawCanvas() {
    const canvas = document.querySelector('#progressCanvas');
    this.ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    	
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.lineWidth = this.circleDepth;
    this.canvasX = canvas.width / 2;
    this.canvasY= canvas.height / 2; 
    	 
    let part = this.completed/this.props.total;
    
    this.ctx.beginPath();
    this.ctx.clearRect(0,0, this.canvasX*2, this.canvasY*2);
    this.ctx.arc(this.canvasX,this.canvasY,this.circleInnerR,0,Math.PI*2*part);
    this.ctx.strokeStyle = this.circleInnerColor;
    this. ctx.stroke();
    	
    this.ctx.beginPath();
    this.ctx.arc(this.canvasX,this.canvasY,this.circleOuterR,0,Math.PI*2);
    this.ctx.strokeStyle = this.circleOuterColor;
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.fillText(Math.ceil(part * 100)+ '%',this.canvasX,this.canvasY+10);
  }
}
