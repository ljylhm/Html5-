        var ctx = document.getElementById("can").getContext("2d"),
            blockSize = 20,
            fx = 1; // 当前方向 贪吃蛇不能朝自己的相反方向前进 
            head = 3,  // 贪吃蛇的头部 
            next = null, // 贪吃蛇下一个前进的方向 
            sn = [2, 1, 0],  // 贪吃蛇的身体 贪吃蛇所占的块数的位置
            food = null, // 贪吃蛇的食物
            snakeProgress = null; // 贪吃蛇当前运行的进程

        // 获取数据类型
        var getDataType = function (obj) {
            if (!obj) return;
            var _type = '',
                _type_str = '';

            _type = Object.prototype.toString.call(obj);
            _type_str = _type.substring(8, _type.length - 1);

            return _type_str;
        }
        // 除法的时候 返回其整数和余数
        var getRemainder = function (number, dividend) {
            if (!number && number != 0) return;
            var dividend = dividend || 1;
            var number_obj = {
                integer: parseInt(number / dividend),
                remainder: number % dividend
            }
            return number_obj;
        }

        // 获得块数的位置
        var getBlockPos = function (blockNum) {
            var blockNum = 0 || blockNum,
                numObj = getRemainder(blockNum, blockSize);
            return {
                row: numObj.remainder * 20,
                col: numObj.integer * 20
            }
        }

        // 判断是否出界 
        var isOut = function(){  // 除了出界外 贪吃蛇还不能碰到自己
            if(!sn) return false;                
            else if(fx == 1 && head%blockSize == 19 ||　fx == -1 && head%blockSize == 0   || head>399 || head<0){
                return false;       
            }else if(sn.indexOf(next) >=0 ){
                return false;
            }else{
                return true;
            }
        }
        
        // 得出食物随机出现的位置
        var snakeFood = function(){
           food = (Math.random()*400).toFixed(0);
           while(sn.indexOf(food) != -1){
                food = (Math.random()*400).toFixed(0);
           }
           return food;                   
        } 
        // 绘制的函数  
        var draw = function (blockNum, color) {
            var pos = getBlockPos(blockNum);
            ctx.fillStyle = color || "Lime";
            ctx.fillRect(pos.row, pos.col, 18, 18);
        }

        // 初始化贪吃蛇
        var init = function (arr) {
            if(!arr || getDataType(arr)!="Array"){
                console.warn("~~~~数据类型必须为Array~~~~");
                return;
            }
            
            arr.forEach(function(value,index,array){
               //console.log(getBlockPos(value));
               draw(value);
            });

           draw(snakeFood(),"red");

        }

        // 贪吃蛇运行的函数
        var snakeMove = function(){
            if(!isOut()){
                alert("GAME OVER");
                clearInterval(snakeProgress);
                return;
            }
            sn.unshift(head=sn[0]+fx) && draw(head);
            next = head+fx;
            // 判断是否吃到了食物
            if(head != food) draw(sn.pop(),"black");
            else draw(snakeFood(),"red");
            
        }  

        // 运行主函数
        var main = function () {
            init(sn);
            snakeProgress = setInterval(snakeMove,100)   
        }

        main();

        document.onkeydown = function (e) {
            var code = [-1,-20,1,20][(e || event).keyCode-37] || fx;
            fx = fx + code == 0 ? fx : code;
            // fx = [-1,-20,1,20][(e || event).keyCode-37] || fx;
        }