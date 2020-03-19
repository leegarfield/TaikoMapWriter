//处理canvas图形绘制

//init
var canvasDrawTmw = new Object();

//method

//initial a new canvasDraw Obj
canvasDrawTmw.create = function(tjaArray = Array){
    this.loadTja(tjaArray);
    this.loadTemplate();
}

//Load tja context
canvasDrawTmw.loadTja = function(tjaArray = Array){
    this.tjaFile = tjaArray;
    this.tjaLoaded = true;
};

//select the course to draw
canvasDrawTmw.selectCourse = function(course = String){
    //handle course change
    if (this.tjaLoaded){
        this.course = course;
    }else{
        console.log('canvas.js: tja not loaded!');
    }
}

//select div parent of canvas
canvasDrawTmw.setCanvasDiv = function(divObj = Object){
    this.canvas = divObj.children()[0].getContext('2d');
}
//select canvas directly
canvasDrawTmw.setCanvas = function(canvasObj = Object){
    this.canvas = canvasObj[0].getContext('2d');
}

//draw!
canvasDrawTmw.draw = function(partionNum = int){
    if (this.tjaLoaded){
        if(this.canvas[partionNum].length<1){
            console.log('canvas.js: canvas not exist!');
            return;
        }else{
            this.directDraw(partionNum);
        }
    }else{
        console.log('canvas.js: parent Div not set!');
    }
}

//draw @directStr into @partionNum, else draw from file if @directStr not set
canvasDrawTmw.directDraw = function(partionNum = int, directStr = String){
    if(directStr){
        this.canvas = this.canvasDiv.children()
    }
    console.log(directStr);
}

canvasDrawTmw.loadTemplate = function(){

}