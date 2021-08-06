chrome.runtime.sendMessage({ todo: "showPageAction" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "changeColor") {
        var addedColor = request.clickedColor;
        $(".dates").css('color', addedColor);
    }
})


// addEventListener version
document.addEventListener('selectionchange', () => {
    //console.log("inside event page" + document.getSelection());
    

});


document.addEventListener("mouseup", function (event) {
    //var text = window.getSelection().toString();
    //$(".output").append("<div>" + text + "</div>");

    processText();

    //console.log("selected text " + r.text);
}, false);

const helpingVerbs = new Array("to","am","is","are","was","were","being","been","do","did","does","have","has","had","may","might","must","can","could","shall","should","will","would");


function processSelectedText(selectedText){
    
    let htmlContent="";
    let firstIsSpace = false;
    let lastIsSpace = false

    //check if first element is the space

    if(selectedText && selectedText[0]=== " "){
        firstIsSpace = true;
    }

    if(selectedText.length > 1 && selectedText[selectedText.length-1]=== " "){
        lastIsSpace = true;
    }
    
    let wordsWrappedInHtml = "";

    //we need to get the words
    const splits = selectedText.split(" ");

    for(let i = 0; i < splits.length; i++){
        if(isHelpingVerb(splits[i])){
            wordsWrappedInHtml += "<span style='color:blue;'> "+splits[i]+"</span>"
        }
        else{
            wordsWrappedInHtml += "<span style='color:red;'> "+splits[i]+"</span>"
        }
    }
    

    if(firstIsSpace){
        htmlContent = "<span style='color:yellow;'> </span>"
    }
    htmlContent += wordsWrappedInHtml;

    if(lastIsSpace){
        htmlContent += "<span style='color:yellow;'> </span>"
    }


    return htmlContent;

}

function isHelpingVerb(word){
    return helpingVerbs.find((str) => str === word)

}

function processText(){
    let sel;
    let range;
    if(window.getSelection){
        sel = window.getSelection();
        if(sel.getRangeAt && sel.rangeCount){
            range = window.getSelection().getRangeAt(0);

            const allText = range.startContainer.data;

            const selectedText = allText.substring(range.startOffset,range.endOffset);

            if(selectedText == ""){
                return;
            }


            const startOffset = range.startOffset;
            const endOffset   = range.endOffset;

            // now we should remove the selected text
            const removedText = allText.substring(0,startOffset)+allText.substring(endOffset,allText.length);

            range.startContainer.data = "";
            // range.startOffset = startOffset;
            // range.endOffset = endOffset;
            

            const textBefore = allText.substring(0,startOffset);
            const textAfter  = allText.substring(endOffset,allText.length);
            const processedTextHtml = textBefore + processSelectedText(selectedText) + textAfter;


            //covering all the elements into single single tag 
            const node = document.createElement("span");
            node.innerHTML = processedTextHtml;


            //pasting processed content here
            range.insertNode(node);

            window.getSelection().empty();


        }
    }
}


function insertHtmlAtSelectionEnd(html, isBefore) {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            range.collapse(isBefore);

            // Range.createContextualFragment() would be useful here but was
            // until recently non-standard and not supported in all browsers
            // (IE9, for one)
            var el = document.createElement("span");
            el.innerHTML = html;
            // var frag = document.createDocumentFragment(), node, lastNode;
            // while ( (node = el.firstChild) ) {
            //     lastNode = frag.appendChild(node);
            // }
            //range.insertNode(frag);
            range.insertNode(el);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(isBefore);
        range.pasteHTML(html);
    }
}