import toast from "react-hot-toast"
import { useOrderStore } from "../store/order"

const OrderDetailModal = ({ setIsOrderDetailOpen, orderId }) => {
	const { getOrder, updateOrder } = useOrderStore()

	const order = getOrder(orderId)

	const orderItems = order.items

	const handleCancelOrder = async (id, updatedOrder) => {
		const { success } = await updateOrder(id, updatedOrder)
		if (!success) {
			toast.error("Failed to update order")
		}
		if (success) {
			toast.success("Order updated")
			setIsOrderDetailOpen(false)
		}
	}

	const updateOrderStatus = (status) => {
		const updatedOrder = {
			...order,
			status: status,
		}
		handleCancelOrder(orderId, updatedOrder)
	}

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			setIsOrderDetailOpen(false)
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-lg max-h-full w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center text-white font-bold">
					Order #{orderId}
				</h1>
				<span
					className={`${
						order.status === "pending"
							? "bg-yellow-500 border-yellow-500 text-yellow-500"
							: order.status === "completed"
							? "bg-green-500 border-green-500 text-green-500"
							: order.status === "cancelled"
							? "bg-red-500 border-red-500 text-red-500"
							: ""
					} text-center rounded-full mx-auto px-3 py-1 bg-opacity-40 border font-bold capitalize`}
				>
					{order.status}
				</span>
				<hr className="bg-gray-400 border-0 h-px" />
				<div className="flex flex-col gap-4">
					<div className="overflow-auto max-h-56">
					{orderItems.map((item, index) => (
						<div
							className="flex items-center justify-around mb-3"
							key={index}
						>
							<img
								src={item.image}
								alt={item.name}
								className="w-16 h-16 rounded-md mr-2"
							/>
							<h2 className="font-semibold text-lg text-gray-200 !w-28 mr-2">
								{item.name}
							</h2>
							<div className="flex items-center gap-2 mr-6">
								<span className="text-gray-200 font-semibold">
									{item.quantity}
								</span>
							</div>
							<h2 className="font-bold text-lg text-gray-200 !w-24 mr-6">
								LKR {item.price}.00
							</h2>
						</div>
					) ) }
					</div>
					<hr className="bg-gray-400 border-0 h-px" />
					<div className="bg-gray-700 w-full rounded-md p-2">
						<h2 className="text-xl text-gray-200 font-bold mb-3">
							Order Summary
						</h2>
						<div className="flex justify-between items-center">
							<h3 className="text-lg text-gray-300">Total</h3>
							<h3 className="text-lg text-gray-200 font-bold">
								LKR {order.total}.00
							</h3>
						</div>
					</div>
					{order.status === "pending" && (
						<div className="flex gap-3 justify-between">
							<button
								className="w-full bg-red-400 p-2 rounded-md font-bold text-gray-900"
								onClick={() => {
									updateOrderStatus("cancelled")
								}}
							>
								Cancel Order
							</button>
							<button
								className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
								onClick={() => {
									updateOrderStatus("completed")
								}}
							>
								Complete Order
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default OrderDetailModal
