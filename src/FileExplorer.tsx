import React, { useState } from 'react'
import Item from './Item'

export interface ItemData {
	id: number
	name: string
	open?: boolean
	children?: ItemData[]
}

interface FileExplorerProps {
	data: ItemData[]
}

// Function to recursively check directories for the target ID to update
const updateOpenState = (items: ItemData[], id: number, open: boolean): ItemData[] => {
	return items.map(item => {
		// If this is the item we're looking for, update its state
		if (item.id === id) {
			return {
				...item,
				open,
			}
		}

		// If this item has children, check if the target ID is in there
		if (item.children) {
			const updatedChildren = updateOpenState(item.children, id, open)

			return {
				...item,
				children: updatedChildren,
			}
		}

		// This item doesn't match and has no children, return unchanged
		return item
	})
}

const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
	const [items, setItems] = useState<ItemData[]>(data)

	const handleClick = (id: number, open: boolean) => {
		setItems(updateOpenState(items, id, open))
	}

	return (
		<div>
			<h1>File Explorer</h1>
			{items.map(item => (
				<Item
					key={item.id}
					id={item.id}
					name={item.name}
					children={item.children}
					open={item.open}
					onClick={handleClick}
				/>
			))}
		</div>
	)
}

export default FileExplorer
