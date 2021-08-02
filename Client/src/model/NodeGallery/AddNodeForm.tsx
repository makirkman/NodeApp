import React, { useState } from "react" ;
import { INode } from "../SourceNode/SourceNode" ;

interface AddNodeFormProps {
	onClick: (node: INode) => void ;
}

/**
 * A form to allow the user to add a node. Contains input fields for all node
 *  details and a submit button
 */
const AddNodeForm = (
	{onClick}: AddNodeFormProps
) => {

	const [nodeName, setNodeName] = useState("") ;
	const [nodeLocation, setNodeLocation] = useState("") ;
	const [nodeIsStreamable, setNodeIsStreamable] = useState(false) ;

	/** Empty the form's details. */
	const clearForm = () => {
		setNodeName("") ;
		setNodeLocation("") ;
		setNodeIsStreamable(false) ;
	}

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNodeName(event.currentTarget.value!) ;
	} ;
	const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNodeLocation(event.currentTarget.value!) ;
	} ;
	const handleStreamableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNodeIsStreamable(event.currentTarget.checked!) ;
	} ;

	const handleSubmitForm: React.FormEventHandler = (event) => {
		event.preventDefault() ;

		if (!nodeName && !nodeLocation) {
			return ;
		}
		onClick({
			name: nodeName,
			location: nodeLocation,
			isStreamable: nodeIsStreamable
		}) ;
		clearForm() ;
	}

	return (
		<form className="AddNodeForm">
			<label className="NodeFormDetails">
				<input type="text" name="name" value={nodeName} placeholder="name" onChange={handleNameChange} />
			</label>
			<label className="NodeFormDetails">
				<input type="text" name="location" value={nodeLocation} placeholder="location" onChange={handleLocationChange}/>
			</label>
			<label className="NodeFormDetails">
					<input type="checkbox" name="isStreamable" checked={nodeIsStreamable} onChange={handleStreamableChange} />
					<label htmlFor="isStreamable" className="StreamableLabel">Node can be streamed</label>
			</label>
			<button
				className="AddNodeButton"
				onClick = {handleSubmitForm}
			>Add Node</button>
		</form>
	) ;
} ;

export { AddNodeForm } ;
export default AddNodeForm ;