import React from "react";
import {
	FaUser,
	FaShoppingCart,
	FaAddressBook,
	FaUndo,
	FaBan,
	FaHeart,
} from "react-icons/fa";

interface TabNavigationProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
	activeTab,
	setActiveTab,
}) => {
	const tabsConfig = [
		{
			heading: "My Info",
			tabs: [
				{ id: "profile", label: "My Profile", icon: FaUser },
				{ id: "address", label: "Payment Address", icon: FaAddressBook },
			],
		},
		{
			heading: "My Orders",
			tabs: [
				{ id: "orders", label: "My Orders", icon: FaShoppingCart },
				{ id: "returns", label: "My Returns", icon: FaUndo },
				{ id: "cancellations", label: "My Cancellations", icon: FaBan },
			],
		},
		{
			heading: "My WishList",
			tabs: [{ id: "wishlist", label: "My WishList", icon: FaHeart }],
		},
	];

	return (
		<nav className="space-y-4">
			{tabsConfig.map((section) => (
				<div key={section.heading}>
					<h3 className="mb-2 text-sm font-medium text-gray-500">
						{section.heading}
					</h3>
					<ul className="space-y-2">
						{section.tabs.map((tab) => (
							<li key={tab.id}>
								<button
									onClick={() => setActiveTab(tab.id)}
									className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors ${
										activeTab === tab.id
											? "bg-primary text-primary-foreground"
											: "hover:bg-muted hover:text-primary"
									}`}
								>
									<tab.icon className="mr-2 h-4 w-4" />
									<span>{tab.label}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
};

export default TabNavigation;
