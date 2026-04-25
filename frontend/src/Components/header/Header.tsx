import LogoType from "@/Components/header/Logotype";
import Menu from "@/Components/header/Menu";
import DefaultButton from "@/Components/Button/DefaultButton";

function Header(){

    return <header>
        <LogoType/>
        <Menu />
        <DefaultButton>
            INICIAR SECIÓN
        </DefaultButton>
        <DefaultButton>
            SER UN RIVAL
        </DefaultButton>
    </header>
}

export default Header;