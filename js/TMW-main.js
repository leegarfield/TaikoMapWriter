var version = '0.1_a';

console.log('--------TaikoMapWriter (TMW)-------');
console.log('TaikoMapWriter (TMW) version' + version);
console.log('-----------------------------------');

//init val 初始化变量

var allowedFileType = ['tja', 'ogg', 'mp3'];
var file = new Array();

$(document).ready(function(){

    //拖至窗口上传
    var dragEventTarget = "";
    //释放文件
    document.addEventListener("drop",function(e){
        e.preventDefault();

        //get files
        var fileList = e.dataTransfer.files;
        if(fileList.length == 0){
            return false;            
        }
        for (var i=0; i<fileList.length; i++){
            var filename = fileList[i].name.split('.');
            //检测文件类型
            if (allowedFileType.indexOf(filename[filename.length-1])>-1){
                switch (filename[filename.length-1]){
                    case "tja": 
                    file['tja'] = fileList[i];
                    // 读取tja
                    tjaLoad('Shift-JIS', file['tja']);
                    break;

                    case "mp3":
                    file['song'] = fileList[i];
                    file['filename'] = fileList[i].name;
                    musicLoad(file['song']);
                    break;

                    case "ogg":
                    file['song'] = fileList[i];
                    file['filename'] = fileList[i].name;
                    musicLoad(file['song']);
                    break;
                }

                //animation
                $('#upload-alert').text('');
                $(".upload").css("z-index", "-1");
                $(".upload-content").css("z-index", "-1");
                $(".upload-content").hide;
                $('.upload').stop(true);
                $(".upload").animate({opacity:'0.1'}, 0);

            }else{
                $('#upload-alert').text('包含不受支持的文件格式');
                $('.upload').stop(true);
                $(".upload").css("z-index", "101");
                $(".upload-content").css("z-index", "100");
                $('.upload').animate({opacity:'0.1'}, 0);
                break;
            }
        }
    });
    // 拖离窗口
    document.addEventListener("dragleave",function(e){
        e.preventDefault();
        if(e.target == dragEventTarget){
            $('.upload').stop(true);
            $('.upload').animate({opacity:'0.1'});
        }
    });
    //拖进窗口
    document.addEventListener("dragenter",function(e){
        e.preventDefault();
        dragEventTarget = e.target;
        $(".upload").css("z-index", "101");
        $(".upload-content").css("z-index", "100");
        $(".upload-content").css("diaplay", "block");
        $('.upload').animate({opacity:'0.5'});
    });
    //悬浮
    document.addEventListener("dragover",function(e){
        e.preventDefault();
    });



    //read tja files and output into tja editor
    var tjaLoad = function(encode, tjaFile){
        var tjaReader = new FileReader();
        tjaReader.readAsText(tjaFile, encode);
        tjaReader.onload = function(){
            $('.tja-editor').text(this.result);
            updateTrack();
        }
    }
    
    
    //read music files and generate wave form img
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'white',
        forceDecode: true,
        partialRender: true,
    })
    var musicLoad = function(musicFile){
        wavesurfer.loadBlob(musicFile)
    };
    wavesurfer.on('ready', function(){
        updateTrack();

        console.log(file['BPM']);
        console.log(file['OFFSET']);
        
        var bpm = file['BPM'], offset = file['OFFSET'];
        wavesurfer.zoom(5*bpm/2);
        $('.track').css('padding-left', -offset*5*bpm/2);
    });


    //play
    $('.play').click(function(){
        wavesurfer.playPause();
    })

    //update track
    var updateTrack = function(){
        var value = $('.tja-editor').val();
        var valueslice = value.split('\n');
        var courseCurrent = '';
        for (var i=0; i<valueslice.length; i++){
            var sep = valueslice[i].split(':');
            switch (sep[0]){
                case 'TITLE':
                file[sep[0]] = sep[1];
                break;
                case 'SUBTITLE':
                file[sep[0]] = sep[1];
                break;
                case 'WAVE':
                file[sep[0]] = sep[1];
                break;
                case 'GENRE':
                file[sep[0]] = sep[1];
                break;
                case 'BPM':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'OFFSET':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'SONGVOL':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'SEVOL':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'SCOREMODE':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'SCOREMODE':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'SIDE':
                file[sep[0]] = parseFloat(sep[1]);
                break;
                case 'COURSE':
                console.log(sep[1]);
                break;
            }
        }
        console.log(valueslice);
    };
    
});


