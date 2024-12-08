import React from "react";

const PreLoader: React.FC = () => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-tokyo-night-background text-tokyo-night-red">
			<div className="h-96 w-4/5 max-w-2xl overflow-hidden rounded-lg border-2 border-tokyo-night-red bg-tokyo-night-background shadow-lg">
				<div className="flex h-8 items-center border-b border-tokyo-night-red bg-tokyo-night-selection px-4">
					<div className="flex space-x-2">
						<div className="h-3 w-3 rounded-full bg-tokyo-night-orange"></div>
						<div className="h-3 w-3 rounded-full bg-tokyo-night-yellow"></div>
						<div className="h-3 w-3 rounded-full bg-tokyo-night-red"></div>
					</div>
				</div>
				<div className="p-4">
					<div className="typing-animation">
						<span className="text-tokyo-night-red">➜</span> Loading theme configuration
						<span className="animate-pulse">_</span>
					</div>
					<div className="mt-2 opacity-75">
						<span className="text-tokyo-night-red">•</span> Resolving system preferences
					</div>
					<div className="mt-2 opacity-50">
						<span className="text-tokyo-night-red">•</span> Applying theme settings
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(PreLoader);
