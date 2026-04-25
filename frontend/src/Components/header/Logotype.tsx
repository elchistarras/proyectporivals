import TextBiColor from "@/Components/text/TextBiColor";

function LogoType(){
    return <div className="logo">
        <h1>
            <TextBiColor textWhite="RIVALS" textRed=".GG" />
        </h1>
        <span className="logotype-beta">BETA</span>
    </div>
}

export default LogoType;