//处理canvas图形绘制

var canvasDrawTmw = function(){
    
    
    //init
    this.tjaFile = [];
    this.template = [];
    this.noteOffset = -1200;
    
    //method
    
    //initial a new canvasDraw Obj
    this.create = function(tjaArray = Array){
        this.loadTja(tjaArray);
        this.loadTemplate();
    }
    
    //Load tja context
    this.loadTja = function(tjaArray = Array){
        this.tjaFile = tjaArray;
        this.tjaLoaded = true;
    };
    
    //select the course to draw
    this.selectCourse = function(course = String){
        //handle course change
        if (this.tjaLoaded){
            this.course = course;
        }else{
            console.log('canvas.js: tja not loaded!');
        }
    }
    
    //select div parent of canvas
    this.setCanvasDiv = function(divObj = Object){
        this.canvas = divObj.children()[0].getContext('2d');
        this.canvasEle = divObj.children()[0];
    }
    //select canvas directly
    this.setCanvas = function(canvasObj = Object){
        this.canvas = canvasObj[0].getContext('2d');
        this.canvasEle = canvasObj[0];
    }
    
    //draw!
    this.draw = function(partionNum = int){
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
    this.directDraw = function(partionNum = int, directStr = String){
        if(directStr){
            this.canvas = this.canvasDiv.children()[0];
        }
        console.log(directStr);
    }
    
    //test func, draw sonmething
    this.testDraw = function(){
        this.loadTemplate();
        var offset = this.noteOffset;
        this.noteOffset += 3;
        if(this.noteOffset > 1200){
            this.noteOffset = -1200;
        }
        var partition = 643;

        // clear canvas
        this.canvasEle.height = this.canvasEle.height;

        // partition line
        for (var i=0; i<108; i++){
            if(i % 3 != 0){
                this.canvas.drawImage(this.template['subPartition9'], partition*i/36-offset,0);
            }else if(i % 9 != 0){
                this.canvas.drawImage(this.template['subPartition3'], partition*i/36-offset,0);
            }
        }
        for (var i=0; i<192; i++){
            if(i % 4 != 0){
                this.canvas.drawImage(this.template['subPartition16'], partition*i/64-offset,0);
            }else if(i % 16 != 0){
                this.canvas.drawImage(this.template['subPartition4'], partition*i/64-offset,0);
            }
        }
        for (var i=0; i<12; i++){
            this.canvas.drawImage(this.template['subPartition'], partition*i/4-offset,0);
        }
        this.canvas.drawImage(this.template['partition'], partition*2-offset,0);
        this.canvas.drawImage(this.template['partition'], partition*1-offset,0);
        this.canvas.drawImage(this.template['partition'], partition*0-offset,0);
        // note
        this.canvas.drawImage(this.drawCo_l(partition/4*1), partition/8*16-offset,0);
        this.canvas.drawImage(this.drawBalloom(partition/4*1), partition/8*12-offset,0);
        // this.canvas.drawImage(this.template['ba'], partition/8*12-offset,0);
        this.canvas.drawImage(this.template['Ka_l'], partition/8*11-offset,0);
        this.canvas.drawImage(this.template['Don_l'], partition/8*10-offset,0);
        this.canvas.drawImage(this.template['Ka_l'], partition/8*9-offset,0);
        this.canvas.drawImage(this.template['Don_l'], partition/8*8-offset,0);
        this.canvas.drawImage(this.drawCo_s(partition/8*1), partition/8*6-offset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/24*15-offset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/24*14-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/24*13-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/24*12-offset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/48*20-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/48*16-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/48*12-offset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/16*2-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/16*1-offset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/16*0-offset,0);
    }
    
    //load all element needs to be draw
    this.loadTemplate = function(){
        var colorDon = 'rgb(243,71,40)',
        colorKa = 'rgb(101,189,187)',
        colorFace = 'rgb(240,236,219)',
        colorCo = 'rgb(243,181,0)',
        colorba = 'rgb(248,119,0)',
        colorbaBa = 'rgb(248,79,0)';
        //don s (L: 50px, border: -2,5px))
        var canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,24,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorDon;
        ele.beginPath();//draw center
        ele.arc(53,51,19,0,Math.PI * 2);
        ele.fill();
        this.template['Don_s'] = canvasObj;

        //ka s (L: 50px, border: -2,5px)
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,24,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorKa;
        ele.beginPath();//draw center
        ele.arc(53,51,19,0,Math.PI * 2);
        ele.fill();
        this.template['Ka_s'] = canvasObj;

        //don l (L: 76px, border: -2,8px)
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,39,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,37,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorDon;
        ele.beginPath();//draw center
        ele.arc(53,51,30,0,Math.PI * 2);
        ele.fill();
        this.template['Don_l'] = canvasObj;

        //ka l (L: 76px, border: -2,8px)
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,39,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,37,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorKa;
        ele.beginPath();//draw center
        ele.arc(53,51,30,0,Math.PI * 2);
        ele.fill();
        this.template['Ka_l'] = canvasObj;

        //combo note s (L: 50px)
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,0,Math.PI*2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,24,0,Math.PI*2);
        ele.fill();
        ele.fillStyle = colorCo;
        ele.beginPath();//draw center
        ele.arc(53,51,19,0,Math.PI*2);
        ele.fill();
        this.template['Co_sstart'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = colorCo;
        ele.beginPath();//draw center
        ele.arc(53,51,24,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(52, 25, 1, 52);//draw border
        ele.fillStyle = colorCo;
        ele.fillRect(52, 27, 1, 48);//draw center
        this.template['Co_send'] = canvasObj;

        //combo note l (L: 76px)
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,39,0,Math.PI*2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,37,0,Math.PI*2);
        ele.fill();
        ele.fillStyle = colorCo;
        ele.beginPath();//draw center
        ele.arc(53,51,30,0,Math.PI*2);
        ele.fill();
        this.template['Co_lstart'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,39,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = colorCo;
        ele.beginPath();//draw center
        ele.arc(53,51,37,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(52, 12, 1, 78);//draw border
        ele.fillStyle = colorCo;
        ele.fillRect(52, 14, 1, 74);//draw center
        this.template['Co_lend'] = canvasObj;

        //balloom (L: 50px, border: -2,8px)
        //draw circle
        canvasObj = document.createElement('canvas');
        canvasObj.width = 200;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.scale(1.2,1);
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw balloom border
        ele.arc(113,51,22,0,Math.PI * 2);
        ele.fill();
        ele.beginPath();
        ele.moveTo(67,51);
        ele.lineTo(105,31);
        ele.lineTo(105,71);
        ele.fill();
        var mid = canvasObj;
        ele.fillStyle = colorbaBa;
        ele.beginPath();//draw balloom
        ele.arc(113.5,51,20,0,Math.PI * 2);
        ele.fill();
        ele.beginPath();
        ele.moveTo(70,51);
        ele.lineTo(105,33);
        ele.lineTo(105,69);
        ele.fill();
        var mid = canvasObj;
        //draw else
        canvasObj = document.createElement('canvas');
        canvasObj.width = 200;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(88, 41, 50, 21);//draw balloom border
        ele.drawImage(mid, 0, 0);
        ele.fillRect(53, 38, 36, 27);
        ele.fillStyle = colorbaBa;
        ele.fillRect(88, 43, 48, 17);//draw balloom
        ele.fillStyle = colorba;
        ele.fillRect(53, 40, 34, 23);
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorFace;
        ele.beginPath();//draw border
        ele.arc(53,51,24,0,Math.PI * 2);
        ele.fill();
        ele.fillStyle = colorba;
        ele.beginPath();//draw center
        ele.arc(53,51,19,0,Math.PI * 2);
        ele.fill();
        this.template['ba'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.beginPath();//draw border
        ele.arc(53,51,26,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = colorba;
        ele.beginPath();//draw center
        ele.arc(53,51,24,Math.PI/2*3,Math.PI/2);
        ele.fill();
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(52, 25, 1, 52);//draw border
        ele.fillStyle = colorba;
        ele.fillRect(52, 27, 1, 48);//draw center
        this.template['ba_end'] = canvasObj;

        //partion line (h: 102px, w: 2px, rgb(236, 115, 78), border: -2,8px, rgb(245, 238, 220))
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#bbb';
        ele.fillRect(52, 0, 3, 103);
        this.template['partition'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#888';
        ele.fillRect(53, 10, 1, 83);
        this.template['subPartition'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 10, 1, 23);
        this.template['subPartition3'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 10, 1, 10);
        this.template['subPartition9'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 70, 1, 23);
        this.template['subPartition4'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 83, 1, 10);
        this.template['subPartition16'] = canvasObj;

    }

    // draw combo note
    this.drawCo_s = function(duration){
        var colorCo = 'rgb(243,181,0)';
        var canvasObj = document.createElement('canvas');
        canvasObj.width = parseInt(duration)+1;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d');
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(0, 25, duration, 52);//draw border
        ele.fillStyle = colorCo;
        ele.fillRect(0, 27, duration, 48);//draw center
        var mid = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106+duration;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.drawImage(mid, 53, 0);
        ele.drawImage(this.template['Co_send'], duration, 0);
        ele.drawImage(this.template['Co_sstart'], 0, 0);
        return canvasObj;
    }
    this.drawCo_l = function(duration){
        var colorCo = 'rgb(243,181,0)';
        var canvasObj = document.createElement('canvas');
        canvasObj.width = parseInt(duration)+1;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d');
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(0, 12, duration, 78);//draw border
        ele.fillStyle = colorCo;
        ele.fillRect(0, 14, duration, 74);//draw center
        var mid = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106+duration;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.drawImage(mid, 53, 0);
        ele.drawImage(this.template['Co_lend'], duration, 0);
        ele.drawImage(this.template['Co_lstart'], 0, 0);
        return canvasObj;
    }
    this.drawBalloom = function(duration){
        var colorba = 'rgb(248,119,0)';
        var canvasObj = document.createElement('canvas');
        canvasObj.width = parseInt(duration)+1;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d');
        ele = canvasObj.getContext('2d');
        ele.fillStyle = 'rgb(0,0,0)';
        ele.fillRect(0, 25, duration, 52);//draw border
        ele.fillStyle = colorba;
        ele.fillRect(0, 27, duration, 48);//draw center
        var mid = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106+duration;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.drawImage(mid, 53, 0);
        ele.drawImage(this.template['ba_end'], duration, 0);
        ele.drawImage(this.template['ba'], 0, 0);
        return canvasObj;
    }
}