import { ItemData } from './FileExplorer'

interface ItemProps {
	id: number
	name: string
	open?: boolean
	children?: ItemData[]
	onClick?: (id: number, open: boolean) => void
}

// Item can be either a directory with child items or a file
const Item: React.FC<ItemProps> = ({ id, name, open, children, onClick }) => {
	const handleItemClick = () => {
		if (onClick) onClick(id, !open) // Toggle the open state when clicked
	}

	return (
		<div className='item' style={{ paddingLeft: '20px' }}>
			{children && children.length > 0 ? (
				// If it's a directory, display the name and recursively render children
				<div className='directory'>
					<button onClick={handleItemClick}>
						<p>{open ? 'v' : '>'}</p>
						<p>{name}</p>
					</button>
					<>
						{open &&
							children.map(child => (
								<Item
									key={child.id}
									id={child.id}
									name={child.name}
									open={child.open}
									children={child.children}
									onClick={onClick}
								/>
							))}
					</>
				</div>
			) : (
				// If it's a file, just display the name
				<p style={{ paddingLeft: '36px' }}>{name}</p>
			)}
		</div>
	)
}

export default Item
