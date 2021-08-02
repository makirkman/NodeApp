import './SquareDisplay.css' ;

export interface SquareProps {
	text: string
} ;

const SquareDisplay = ({
	text
}: SquareProps) => {
	return <p className="SquareDisplay">{text}</p> ;
}

export default SquareDisplay ;
export { SquareDisplay } ;