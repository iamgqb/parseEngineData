
// engineData is an array form descriptor.coffee

var MATCH_TYPE = [  hashStart,
                    hashEnd,
                    multiLineArrayStart,
                    multiLineArrayEnd,
                    property, 
                    propertyWithData];

var nodeStack = [], propertyStack = [];
var currentNode, currentProperty;

var paresr = function(engineData){
    //字符替换？
    textReg(textSegment(codeToString(engineData)));
    //分割
    //逐行正则
    console.log(nodeStack)
}


function codeToString(engineData){
    return String.fromCharCode.apply(null, engineData);
}

function textSegment(text){
    return text.split('\n');
}

function textReg(textArr){
    textArr.map(function(currentText){
        matchTest(currentText.replace(/^\t+/g, ''));
    });
}

function matchTest(currentText){

    for (var currentType in MATCH_TYPE) {
        var t = new MATCH_TYPE[currentType](currentText);
        if (t.match){
            t.parse();
            return;
        }
    }
}

// helper fun
function Match(reg, text){
    return reg.test(text);
}
function isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]';
}


// reg fun
function hashStart(text){
    var reg = /^<<$/;

    return {
        match: Match(reg, text),
        parse: function(){
            nodeStack.push({});
        }
    }
}
function hashEnd(text){
    var reg = /^>>$/;

    return {
        match: Match(reg, text),
        parse: function(){
            var data = nodeStack.pop();
            pushKeyValue(data);
        }
    }
}
function multiLineArrayStart(text){
    var reg = /^\/(\w+) \[$/;

    return {
        match: Match(reg, text),
        parse: function(){
            nodeStack.push([]);
            propertyStack.push(text.match(reg)[1]);
        }
    }
}
function multiLineArrayEnd(text){
    var reg = /^\]$/;

    return {
        match: Match(reg, text),
        parse: function(){
            var data = nodeStack.pop();
            pushKeyValue(data);
        }
    }
}
function property(text){
    var reg = /^\/([A-Z0-9]+)$/i;

    return {
        match: Match(reg, text),
        parse: function(){
            propertyStack.push(text);
        }
    }
}
function propertyWithData(text){
    var reg = /^\/([A-Z0-9]+) (.*)$/i;

    return {
        match: Match(reg, text),
        parse: function(){
            var match = text.match(reg);
            pushKeyValue(match[2], match[1])
        }
    }
}


function pushKeyValue(data, property){ 
    //参数顺序不换，函数内检查对象是否有key，push到数组中无key
    var o = nodeStack[nodeStack.length-1];
    if (isArray(o)){
        nodeStack[nodeStack.length-1].push(data);
    } else {
        nodeStack[nodeStack.length-1][propertyStack.pop()] = data;        
    }
}
module.exports = paresr;
