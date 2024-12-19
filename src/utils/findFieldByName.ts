export default function findFieldByName(obj: any, targetName: string): any {
	if (typeof obj !== "object" || obj === null) return undefined;

	// Check if the current object has the desired name
	if ("name" in obj && obj.name === targetName) {
		return obj;
	}

	// Recursively search in arrays or objects
	for (const key in obj) {
		if (Array.isArray(obj[key])) {
			for (const item of obj[key]) {
				const result = findFieldByName(item, targetName);
				if (result) return result;
			}
		} else if (typeof obj[key] === "object") {
			const result = findFieldByName(obj[key], targetName);
			if (result) return result;
		}
	}

	return undefined;
}
