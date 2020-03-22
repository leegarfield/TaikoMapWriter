//处理canvas图形绘制

var canvasDrawTmw = function(){
    
    
    //init
    this.tjaFile = [];
    this.template = [];
    this.noteOffset = 0;
    this.timeOffset = 0;
    this.scaleEle = [];
    this.defaultPartitionPx = 643;
    this.canvasEleOffset = 53;
    this.showSnap = true;
    
    //snap
    this.mousePointing = [0,0];
    
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
    this.draw = function(partionNum = Number){
        //testdraw for present
        this.testDraw();

        var Gap48 = this.defaultPartitionPx / 48,
        Gap64 = this.defaultPartitionPx / 64,
        snapInitOffset = 53,
        afterOffset = 48.5;

        if(this.showSnap){
            if(this.mousePointing[1] == 3){
                this.canvas.drawImage(this.template['mouseSnap'], this.mousePointing[0] * Gap48 + afterOffset + this.timeOffset, 5);
            }else if(this.mousePointing[1] == 4){
                this.canvas.drawImage(this.template['mouseSnap'], this.mousePointing[0] * Gap64 + afterOffset + this.timeOffset, 88);
            }
        }

        return;

        if (this.tjaLoaded){
            if(this.canvas[partionNum].length<1){
                console.log('canvas.js: canvas not exist!');
                return;
            }else{
            }
        }else{
            console.log('canvas.js: parent Div not set!');
        }
    }
    
    //draw @directStr into @partionNum, else draw from file if @directStr not set
    this.directDraw = function(partionNum = Number, directStr = String){
        if(directStr){
            this.canvas = this.canvasDiv.children()[0];
        }
        console.log(directStr);
    }
    
    //test func, draw sonmething
    this.testDraw = function(){
        var partition = this.defaultPartitionPx;

        // clear canvas
        this.canvasEle.height = this.canvasEle.height;

        //scale
        for(var i = 0; i<12; i++){
            this.canvas.drawImage(this.drawScaleElement(4), partition*i/4- this.noteOffset - this.timeOffset,0);
            this.canvas.drawImage(this.template['subPartition'], partition*i/4- this.noteOffset - this.timeOffset,0);
        }

        this.canvas.drawImage(this.template['partition'], partition*2- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['partition'], partition*1- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['partition'], partition*0- this.noteOffset - this.timeOffset,0);
        // note
        this.canvas.drawImage(this.drawCo_l(partition/4*1), partition/8*16- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.drawBalloom(partition/4*1), partition/8*12- this.noteOffset - this.timeOffset,0);
        // this.canvas.drawImage(this.template['ba'], partition/8*12- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_l'], partition/8*11- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_l'], partition/8*10- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_l'], partition/8*9- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_l'], partition/8*8- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.drawCo_s(partition/8*1), partition/8*6- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/24*15- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/24*14- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/24*13- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/24*12- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/48*20- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/48*16- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/48*12- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Ka_s'], partition/16*2- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/16*1- this.noteOffset - this.timeOffset,0);
        this.canvas.drawImage(this.template['Don_s'], partition/16*0- this.noteOffset - this.timeOffset,0);
    };
    
    // bind mouse hover event
    this.bindMouseHover = function(thisObj){
        var Gap48 = thisObj.defaultPartitionPx / 48,
        Gap64 = thisObj.defaultPartitionPx / 64,
        snapInitOffset = 53,
        afterOffset = 48.5,
        mousePointing = thisObj.mousePointing;
        
        $(this.canvasEle).mousemove(function(e){
            mousePointing = thisObj.mousePointing;
            
            if(e.offsetY < 35){
                thisObj.mousePointing = [parseInt((e.offsetX - snapInitOffset - thisObj.timeOffset + Gap48 / 2) / (Gap48)), 3];
            }else if(e.offsetY > 67){
                thisObj.mousePointing = [parseInt((e.offsetX - snapInitOffset - thisObj.timeOffset + Gap64 / 2) / (Gap64)), 4];
            }

            if(mousePointing[0] < 0){
                mousePointing[0] = 0;
            }

            if((mousePointing[0] == thisObj.mousePointing[0]) && (mousePointing[1] == thisObj.mousePointing[1])){
                return;
            }
        });
        $(this.canvasEle).mouseleave(function(e){
            thisObj.showSnap = false;
        });
        $(this.canvasEle).mouseenter(function(e){
            thisObj.showSnap = true;
        });
    };
    //unbind mouse hover event
    this.unbindMouseHover = function(thisObj){
        $(this.canvasEle).unbind('mousemove');
        this.showSnap = false;
    };

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
        ele.fillRect(52, 0, 2, 103);
        this.template['partition'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#888';
        ele.fillRect(53, 0, 1, 102);
        this.template['subPartition'] = canvasObj;
        
        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 0, 1, 29);
        this.template['subPartition3'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 4, 1, 13);
        this.template['subPartition6'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 74, 1, 29);
        this.template['subPartition4'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 106;
        canvasObj.height = 102;
        ele = canvasObj.getContext('2d');
        ele.fillStyle = '#555';
        ele.fillRect(53, 83, 1, 13);
        this.template['subPartition16'] = canvasObj;

        canvasObj = document.createElement('canvas');
        canvasObj.width = 10;
        canvasObj.height = 10;
        ele = canvasObj.getContext('2d');
        var grident = ele.createRadialGradient(5,5,2,5,5,5);
        grident.addColorStop(0, '#fff');
        grident.addColorStop(0.01, 'rgba(255,255,110,1)');
        grident.addColorStop(1, 'rgba(255,255,110,0)');
        ele.fillStyle = grident;
        ele.fillRect(0, 0, 10, 10);
        this.template['mouseSnap'] = canvasObj;
    }

    // draw combo note small
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
    // draw combo note large
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
    // draw balloom
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
    //draw scale, #MEASURE N/4 #scroll scorllSpeed
    this.drawScaleElement = function(scorllSpeed){
        if (this.scaleEle[scorllSpeed]){
            return this.scaleEle[scorllSpeed];
        }

        var canvasObj = document.createElement('canvas');
        canvasObj.width = this.defaultPartitionPx / 16 * scorllSpeed + this.canvasEleOffset;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d'), width = this.defaultPartitionPx / 16 * scorllSpeed;
        
        for (var i=0; i<12; i++){
            if(i % 4 != 0){
                ele.drawImage(this.template['subPartition6'], width*i/12,0);
            }else {
                ele.drawImage(this.template['subPartition3'], width*i/12,0);
            }
        }
        for (var i=0; i<16; i++){
            if(i % 4 != 0){
                ele.drawImage(this.template['subPartition16'], width*i/16,0);
            }else {
                ele.drawImage(this.template['subPartition4'], width*i/16,0);
            }
        }
        this.scaleEle[scorllSpeed] = canvasObj;
        return canvasObj;
    }
    //draw pattition section, #MEASURE N/M #scroll scorllSpeed
    this.drawPatition = function(m, n, scorllSpeed){
        if (this.Partition[m][n][scrollSpeed].length > 1){
            return this.Partition[m][n][scrollSpeed];
        }

        var offset = 53;
        var canvasObj = document.createElement('canvas');
        canvasObj.width = this.defaultPartitionPx / N * scorllSpeed;
        canvasObj.height = 102;
        var ele = canvasObj.getContext('2d');
        
        for (var i=0; i<48; i++){
            if(i % 4 != 0){
                this.canvas.drawImage(this.template['subPartition6'], partition*i/48- this.noteOffset - this.timeOffset,0);
            }else if(i % 9 != 0){
                this.canvas.drawImage(this.template['subPartition3'], partition*i/48- this.noteOffset - this.timeOffset,0);
            }
        }
        for (var i=0; i<64; i++){
            if(i % 4 != 0){
                this.canvas.drawImage(this.template['subPartition16'], partition*i/64- this.noteOffset - this.timeOffset,0);
            }else if(i % 16 != 0){
                this.canvas.drawImage(this.template['subPartition4'], partition*i/64- this.noteOffset - this.timeOffset,0);
            }
        }
    }
}