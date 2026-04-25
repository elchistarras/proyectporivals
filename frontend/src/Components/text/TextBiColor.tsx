
function TextBiColor({
    textWhite = "",
    textRed = ""
}){
    return  <>
        <span className="textWhite">{textWhite}</span><span className="textRed">{textRed}</span>
    </>
}

export default TextBiColor;