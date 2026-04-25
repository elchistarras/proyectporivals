

function DefaultButton({
  children,
}: {
  children: React.ReactNode
}){


    return <button className="default-button">
        {children}
    </button>
}

export default DefaultButton;